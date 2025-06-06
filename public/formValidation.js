function validateForm() {
  const requiredFields = document.querySelectorAll("form [required]");
  let valid = true;

  requiredFields.forEach((field) => {
    if (!field.value.trim()) {
      alert(`Please fill out the "${field.name}" field.`);
      valid = false;
    }
  });

  return valid;
}