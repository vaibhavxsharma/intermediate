document.addEventListener('DOMContentLoaded', () => {

    const contactForm = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    
    const showError = (input, message) => {
        const formGroup = input.parentElement;
        formGroup.classList.add('error');
        const errorText = formGroup.querySelector('.error-text');
        errorText.textContent = message;
    };

    const showSuccess = (input) => {
        const formGroup = input.parentElement;
        formGroup.classList.remove('error');
    };

    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        let isFormValid = true;

        [nameInput, emailInput, messageInput].forEach(input => showSuccess(input));

        if (nameInput.value.trim() === '') {
            showError(nameInput, 'Name is required.');
            isFormValid = false;
        }

        if (emailInput.value.trim() === '') {
            showError(emailInput, 'Email is required.');
            isFormValid = false;
        } else if (!validateEmail(emailInput.value.trim())) {
            showError(emailInput, 'Please enter a valid email address.');
            isFormValid = false;
        }

        if (messageInput.value.trim() === '') {
            showError(messageInput, 'Message cannot be empty.');
            isFormValid = false;
        }

        if (isFormValid) {
            alert('Form submitted successfully! (No data was actually sent)');
            contactForm.reset();
        }
    });

    const taskInput = document.getElementById('task-input');
    const addTaskButton = document.getElementById('add-task-button');
    const taskList = document.getElementById('task-list');

    const addTask = () => {
        const taskText = taskInput.value.trim();

        if (taskText === '') {
            alert("Please enter a task before adding.");
            return;
        }

        const li = document.createElement('li');

        const taskSpan = document.createElement('span');
        taskSpan.className = 'task-text';
        taskSpan.textContent = taskText;

        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'task-actions';

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.setAttribute('aria-label', 'Delete task');
        deleteBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>`;

        actionsDiv.appendChild(deleteBtn);
        li.appendChild(taskSpan);
        li.appendChild(actionsDiv);

        taskList.appendChild(li);

        taskInput.value = '';
        taskInput.focus();

        taskSpan.addEventListener('click', () => {
            taskSpan.classList.toggle('completed');
        });

        deleteBtn.addEventListener('click', () => {
            li.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            li.style.opacity = '0';
            li.style.transform = 'translateX(20px)';
            setTimeout(() => {
                taskList.removeChild(li);
            }, 300);
        });
    };

    addTaskButton.addEventListener('click', addTask);

    taskInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

});
