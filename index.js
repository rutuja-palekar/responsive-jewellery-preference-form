
document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector('.preferenceForm');
    const requiredFields = [
        { id: 'occasion', label: 'Occasion', type: 'select' },
        { name: 'purchaseType', label: 'Purchase Type', type: 'radio' },
        { name: 'ageGroup', label: 'Age Group', type: 'radio' },
        { id: 'gender', label: 'Gender', type: 'custom' },
        { id: 'jewelleryType', label: 'Type of Jewellery', type: 'custom' },
        { name: 'budget', label: 'Budget', type: 'radio' }
    ];

    function showAlert(message) {
        alert(message);
    }


    function gatherFormData() {
        const formData = {};
        requiredFields.forEach(field => {
            if (field.type === 'select') {
                const element = document.getElementById(field.id);
                formData[field.label] = element.value;
            } else if (field.type === 'radio') {
                const elements = form.querySelectorAll(`input[name="${field.name}"]:checked`);
                if (elements.length > 0) {
                    formData[field.label] = elements[0].nextElementSibling.innerText.trim();
                }
            } else if (field.type === 'custom') {
                if (field.id === 'gender') {
                    const male = document.querySelector('.maleGender');
                    const female = document.querySelector('.femaleGender');
                    if (male.classList.contains('selected')) {
                        formData[field.label] = 'Male';
                    } else if (female.classList.contains('selected')) {
                        formData[field.label] = 'Female';
                    }
                } else if (field.id === 'jewelleryType') {
                    const images = form.querySelectorAll('.jewelleryDiv img.selected');
                    if (images.length > 0) {
                        formData[field.label] = images[0].alt;
                    }
                }
            }
        });

        const religionSelect = document.getElementById('religion');
        formData['Religion'] = religionSelect ? religionSelect.value : '';

        const fileInput = document.getElementById('recommendFileUpload');
        if (fileInput && fileInput.files.length > 0) {
            formData['Uploaded Image'] = fileInput.files[0].name;
        } else {
            formData['Uploaded Image'] = '';
        }

        return formData;
    }


    form.addEventListener('submit', function (event) {
        event.preventDefault();
        let invalidFields = [];

        requiredFields.forEach(field => {
            if (field.type === 'select') {
                const element = document.getElementById(field.id);
                if (element.value === '') {
                    invalidFields.push(field.label);
                }
            } else if (field.type === 'radio') {
                const elements = form.querySelectorAll(`input[name="${field.name}"]:checked`);
                if (elements.length === 0) {
                    invalidFields.push(field.label);
                }
            } else if (field.type === 'custom') {
                if (field.id === 'gender') {
                    const male = document.querySelector('.maleGender');
                    const female = document.querySelector('.femaleGender');
                    if (!male.classList.contains('selected') && !female.classList.contains('selected')) {
                        invalidFields.push(field.label);
                    }
                } else if (field.id === 'jewelleryType') {
                    const images = form.querySelectorAll('.jewelleryDiv img.selected');
                    if (images.length === 0) {
                        invalidFields.push(field.label);
                    }
                }
            }
        });

        if (invalidFields.length > 0) {
            event.preventDefault();
            showAlert('Please fill all the required fields.');
        }
        else {
            const formData = gatherFormData();
            console.log(formData);
            showAlert('Form submitted successfully!');
        }
    });

    document.querySelectorAll('.gendersDiv img').forEach(img => {
        img.addEventListener('click', function () {
            document.querySelectorAll('.gendersDiv img').forEach(img => img.classList.remove('selected'));
            img.classList.add('selected');
        });
    });

    document.querySelectorAll('.jewelleryDiv img').forEach(img => {
        img.addEventListener('click', function () {
            document.querySelectorAll('.jewelleryDiv img').forEach(img => img.classList.remove('selected'));
            img.classList.add('selected');
        });
    });

    const occasionSelect = document.getElementById('occasion');
    occasionSelect.addEventListener('change', function () {
        validateOccasion();
    });

    function validateOccasion() {
        const occasionSelect = document.getElementById('occasion');
        if (occasionSelect.value === '') {
            occasionSelect.classList.add('invalid');
        } else {
            occasionSelect.classList.remove('invalid');
        }
    }
});

document.querySelectorAll('.gendersDiv img').forEach(img => {
    img.addEventListener('click', function () {
        const isAlreadySelected = this.classList.contains('selected');

        document.querySelectorAll('.gendersDiv img').forEach(img => {
            img.classList.remove('selected');
            img.style.backgroundColor = '';
            img.style.border = '';
        });

        if (!isAlreadySelected) {
            this.classList.add('selected');
            this.style.backgroundColor = 'rgb(32, 107, 237)';
            this.style.border = '1px solid rgb(32, 107, 237)';
        }
    });
});

document.querySelectorAll('.jewelleryDiv img').forEach(img => {
    img.addEventListener('click', function () {
        const isAlreadySelected = this.classList.contains('selected');

        document.querySelectorAll('.jewelleryDiv img').forEach(img => {
            img.classList.remove('selected');
            img.style.backgroundColor = '';
            img.style.border = '';
        });

        if (!isAlreadySelected) {
            this.classList.add('selected');
            this.style.backgroundColor = 'rgb(32, 107, 237)';
            this.style.border = '1px solid rgb(32, 107, 237)';
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const fileInput = document.getElementById('recommendFileUpload');
    const imagePreview = document.getElementById('imagePreview');

    fileInput.addEventListener('change', function () {
        const file = this.files[0];

        if (file) {
            const reader = new FileReader();

            reader.addEventListener('load', function () {
                const img = document.createElement('img');
                img.src = this.result;
                img.alt = 'Outfit Preview';
                img.classList.add('previewImage');

                imagePreview.innerHTML = '';
                imagePreview.appendChild(img);
            });

            reader.readAsDataURL(file);
        }
    });
});

