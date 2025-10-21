$(document).ready(function() {
    // Contact Form Popup Functionality
    
    // Show/hide budget range based on checkbox
    $('#popupBudget').change(function() {
        if ($(this).is(':checked')) {
            $('#budgetRange').removeClass('budget-range-hidden').slideDown(300);
        } else {
            $('#budgetRange').addClass('budget-range-hidden').slideUp(300);
            $('#popupBudgetRange').val('');
        }
    });
    
    // Handle form submission
    $('#submitContactForm').click(function(e) {
        e.preventDefault();
        
        // Get form data
        var formData = {
            name: $('#popupName').val(),
            email: $('#popupEmail').val(),
            phone: $('#popupPhone').val(),
            service: $('#popupService').val(),
            message: $('#popupMessage').val(),
            budget: $('#popupBudget').is(':checked'),
            budget_range: $('#popupBudgetRange').val()
        };
        
        // Validate required fields
        if (!formData.name || !formData.email || !formData.service || !formData.message) {
            showAlert('Please fill in all required fields.', 'warning');
            return;
        }
        
        // Validate email format
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            showAlert('Please enter a valid email address.', 'warning');
            return;
        }
        
        // Show loading state
        var submitBtn = $(this);
        var originalText = submitBtn.html();
        submitBtn.html('<i class="bi bi-hourglass-split me-2"></i>Sending...');
        submitBtn.prop('disabled', true);
        
        // Send email via FormSubmit service
        sendViaFormSubmit(formData, function(success, message) {
            // Reset button
            submitBtn.html(originalText);
            submitBtn.prop('disabled', false);
            
            if (success) {
                // Show success message
                showAlert('Thank you! Your message has been sent successfully. I\'ll get back to you soon.', 'success');
                
                // Clear form
                $('#contactPopupForm')[0].reset();
                $('#budgetRange').addClass('budget-range-hidden').hide();
                
                // Close modal
                $('#contactFormModal').modal('hide');
            } else {
                // Show error message
                showAlert('Sorry, there was an error sending your message. Please try again or contact me directly.', 'warning');
            }
        });
    });
    
    // Clear form when modal is closed
    $('#contactFormModal').on('hidden.bs.modal', function() {
        $('#contactPopupForm')[0].reset();
        $('#budgetRange').addClass('budget-range-hidden').hide();
        $('#popupBudget').prop('checked', false);
    });
    
    // Show alert function
    function showAlert(message, type) {
        // Remove existing alerts
        $('.contact-alert').remove();
        
        // Create alert element
        var alertClass = type === 'success' ? 'alert-success' : 'alert-warning';
        var alertHtml = '<div class="alert ' + alertClass + ' contact-alert alert-dismissible fade show" role="alert">' +
                       '<i class="bi bi-' + (type === 'success' ? 'check-circle' : 'exclamation-triangle') + ' me-2"></i>' +
                       message +
                       '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>' +
                       '</div>';
        
        // Insert alert at the top of modal body
        $('#contactFormModal .modal-body').prepend(alertHtml);
        
        // Auto-remove success alerts after 5 seconds
        if (type === 'success') {
            setTimeout(function() {
                $('.contact-alert').fadeOut(500, function() {
                    $(this).remove();
                });
            }, 5000);
        }
    }
    
    // Add smooth animations to form elements
    $('#contactFormModal').on('shown.bs.modal', function() {
        $('.form-floating').each(function(index) {
            $(this).css('opacity', '0').delay(index * 100).animate({'opacity': '1'}, 300);
        });
    });
    
    // Add focus effects
    $('.form-control').focus(function() {
        $(this).closest('.form-floating').addClass('focused');
    }).blur(function() {
        if (!$(this).val()) {
            $(this).closest('.form-floating').removeClass('focused');
        }
    });
    
    // Phone number formatting (optional)
    $('#popupPhone').on('input', function() {
        var value = $(this).val().replace(/\D/g, '');
        if (value.length > 0) {
            if (value.length <= 3) {
                value = value;
            } else if (value.length <= 6) {
                value = value.slice(0, 3) + '-' + value.slice(3);
            } else if (value.length <= 10) {
                value = value.slice(0, 3) + '-' + value.slice(3, 6) + '-' + value.slice(6);
            } else {
                value = value.slice(0, 3) + '-' + value.slice(3, 6) + '-' + value.slice(6, 10);
            }
        }
        $(this).val(value);
    });
    
    // Send using FormSubmit (no backend required)
    function sendViaFormSubmit(formData, callback) {
        var endpoint = 'https://formsubmit.co/ajax/medvonjoson@gmail.com';
        var payload = {
            name: formData.name,
            email: formData.email,
            phone: formData.phone || '',
            service: getServiceName(formData.service),
            message: formData.message,
            budget_enabled: formData.budget ? 'Yes' : 'No',
            budget_range: formData.budget_range ? getBudgetRangeName(formData.budget_range) : '',
            _subject: 'New project inquiry from ' + formData.name,
            _template: 'table',
            _captcha: 'false',
            _replyto: formData.email
        };
        $.ajax({
            url: endpoint,
            method: 'POST',
            data: payload,
            dataType: 'json'
        }).done(function() {
            callback(true);
        }).fail(function(xhr) {
            console.error('FormSubmit error:', xhr.responseText || xhr.statusText);
            callback(false);
        });
    }
    
    // Create email body content
    function createEmailBody(formData) {
        var body = 'Hello ' + formData.name + ',\n\n';
        body += 'Thank you for your interest in my services!\n\n';
        body += 'I received your project inquiry with the following details:\n\n';
        body += 'Name: ' + formData.name + '\n';
        body += 'Email: ' + formData.email + '\n';
        body += 'Phone: ' + (formData.phone || 'Not provided') + '\n';
        body += 'Service Needed: ' + getServiceName(formData.service) + '\n';
        body += 'Project Details: ' + formData.message + '\n';
        
        if (formData.budget && formData.budget_range) {
            body += 'Budget Range: ' + getBudgetRangeName(formData.budget_range) + '\n';
        }
        
        body += '\nI will review your requirements and get back to you within 24 hours with a detailed proposal.\n\n';
        body += 'Best regards,\n';
        body += 'Med Vonjoson\n';
        body += 'Intellect Digital Hub\n';
        body += 'Phone: +23278091467\n';
        body += 'Email: hello@medvonjoson@gmail.com';
        
        return body;
    }
    
    // Get service name from value
    function getServiceName(serviceValue) {
        var services = {
            'web-development': 'Web Development',
            'app-development': 'App Development',
            'ai-development': 'AI Development',
            'data-analysis': 'Data Analysis',
            'project-management': 'Project Management',
            'digital-marketing': 'Digital Marketing',
            'web-design': 'Web Design',
            'graphic-design': 'Graphic Design',
            'ui-ux-design': 'UI/UX Design',
            'media-production': 'Media Production',
            'branding': 'Branding',
            'dissertation-writing': 'Dissertation Writing',
            'ecommerce': 'Ecommerce',
            'seo': 'SEO',
            'other': 'Other'
        };
        return services[serviceValue] || serviceValue;
    }
    
    // Get budget range name from value
    function getBudgetRangeName(budgetValue) {
        var budgets = {
            'under-1000': 'Under Nle1,000',
            '1000-2500': 'Nle1,000 - Nle2,500',
            '2500-5000': 'Nle2,500 - Nle5,000',
            '5000-10000': 'Nle5,000 - Nle10,000',
            'over-10000': 'Over Nle10,000'
        };
        return budgets[budgetValue] || budgetValue;
    }
});
