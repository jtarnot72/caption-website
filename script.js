const form = document.getElementById('waitlist-form');
const message = document.getElementById('form-message');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const button = form.querySelector('button');
    const originalText = button.textContent;
    button.textContent = 'Joining...';
    button.disabled = true;

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        message.textContent = "You're on the list! We'll email you when TestFlight opens.";
        message.className = 'form-message success';
        message.hidden = false;
        form.reset();
      } else {
        throw new Error('Request failed');
      }
    } catch (err) {
      message.textContent = 'Something went wrong. Please try again in a moment.';
      message.className = 'form-message error';
      message.hidden = false;
    } finally {
      button.textContent = originalText;
      button.disabled = false;
    }
  });
}

const scrollToForm = document.getElementById('scroll-to-form');
if (scrollToForm) {
  scrollToForm.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('email').scrollIntoView({ behavior: 'smooth', block: 'center' });
    document.getElementById('email').focus();
  });
}
