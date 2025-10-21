/**
 * Download Resume Functionality
 * Simple and reliable download function
 */

function downloadResume(event) {
    // Prevent default link behavior
    if (event) {
        event.preventDefault();
    }
    
    // Simple approach - just open in new tab
    // This is the most reliable method across all browsers
    window.open('cv-resume.html', '_blank');
}

// Alternative function for direct download
function downloadResumeDirect() {
    window.open('cv-resume.html', '_blank');
}

// Print resume function
function printResume() {
    window.open('cv-resume.html', '_blank');
    setTimeout(() => {
        window.print();
    }, 500);
}

/**
 * Download Resume -> generate PDF of #section_resume using html2pdf.js
 */

function loadScript(url) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${url}"]`)) return resolve();
    const s = document.createElement('script');
    s.src = url;
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error('Failed to load ' + url));
    document.head.appendChild(s);
  });
}

document.addEventListener('DOMContentLoaded', function () {
  const btn = document.getElementById('downloadResumeBtn');
  if (!btn) {
    console.error('downloadResumeBtn not found');
    return;
  }

  btn.addEventListener('click', async function (e) {
    e.preventDefault();

    const section = document.getElementById('section_resume');
    if (!section) {
      alert('Resume section not found. Make sure the resume section has id="section_resume"');
      console.error('Missing element: #section_resume');
      return;
    }

    // Ensure html2pdf is available (load if needed)
    if (typeof html2pdf === 'undefined') {
      try {
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.9.3/html2pdf.bundle.min.js');
      } catch (err) {
        console.error(err);
        alert('Could not load html2pdf.js. Check your network or add the CDN script to index.html.');
        return;
      }
    }

    // Disable button while working
    btn.setAttribute('disabled', 'true');

    // Clone section so we don't affect visible page
    const clone = section.cloneNode(true);
    clone.style.background = '#ffffff';
    clone.style.boxSizing = 'border-box';
    clone.style.padding = '16px';
    clone.style.color = '#000';

    // Mark images for CORS (helps html2canvas include them)
    const imgs = Array.from(clone.querySelectorAll('img'));
    imgs.forEach(img => {
      try { img.setAttribute('crossorigin', 'anonymous'); } catch (err) {}
    });

    // Wait for images to load (max 5s)
    await Promise.race([
      Promise.all(imgs.map(img => new Promise(res => {
        if (!img.src) return res();
        if (img.complete) return res();
        img.onload = img.onerror = () => res();
      }))),
      new Promise(res => setTimeout(res, 5000))
    ]);

    // Off-screen container for accurate rendering
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.left = '-9999px';
    container.style.top = '0';
    container.appendChild(clone);
    document.body.appendChild(container);

    const opt = {
      margin:       [10, 10, 10, 10],
      filename:     'Mohamed_A_Vonjo_Resume.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:
    };

    html2pdf().from(clone).set(opt).save();
    container.remove();
  });
});
