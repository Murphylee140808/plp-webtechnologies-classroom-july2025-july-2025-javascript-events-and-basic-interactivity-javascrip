// Ginger your swags abode
        // Theme Toggle Functionality
        const themeToggle = document.getElementById('theme-toggle');
        const themeDemoBtn = document.getElementById('theme-demo-btn');
        const themeStatus = document.getElementById('theme-status');
        let isDarkMode = false;

        function toggleTheme() {
            isDarkMode = !isDarkMode;
            document.body.classList.toggle('dark-mode', isDarkMode);
            
            if (isDarkMode) {
                themeToggle.innerHTML = '<span>☀️</span> Light Mode';
                themeStatus.textContent = 'Current mode: Dark';
            } else {
                themeToggle.innerHTML = '<span>🌙</span> Dark Mode';
                themeStatus.textContent = 'Current mode: Light';
            }
        }

        themeToggle.addEventListener('click', toggleTheme);
        themeDemoBtn.addEventListener('click', toggleTheme);

        // Counter Game Functionality
        const counterValue = document.getElementById('counter-value');
        const incrementBtn = document.getElementById('increment-btn');
        const decrementBtn = document.getElementById('decrement-btn');
        const resetBtn = document.getElementById('reset-btn');
        const gameMessage = document.getElementById('game-message');
        let count = 0;

        function updateCounter() {
            counterValue.textContent = count;
            
            if (count >= 10) {
                gameMessage.textContent = 'Great job! Keep going!';
                gameMessage.style.color = 'var(--accent-color)';
            } else if (count <= -5) {
                gameMessage.textContent = "Don't go too low!";
                gameMessage.style.color = 'var(--primary-color)';
            } else {
                gameMessage.textContent = 'Keep clicking to increase your score!';
                gameMessage.style.color = 'var(--text-color)';
            }
        }

        incrementBtn.addEventListener('click', () => {
            count++;
            updateCounter();
        });

        decrementBtn.addEventListener('click', () => {
            count--;
            updateCounter();
        });

        resetBtn.addEventListener('click', () => {
            count = 0;
            updateCounter();
        });

        // FAQ Section Functionality
        const faqQuestions = document.querySelectorAll('.faq-question');
        
        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                const answer = question.nextElementSibling;
                const isOpen = answer.classList.contains('open');
                
                // Close all answers
                document.querySelectorAll('.faq-answer').forEach(item => {
                    item.classList.remove('open');
                });
                
                document.querySelectorAll('.faq-question span').forEach(item => {
                    item.textContent = '+';
                });
                
                // Open clicked answer if it was closed
                if (!isOpen) {
                    answer.classList.add('open');
                    question.querySelector('span').textContent = '-';
                }
            });
        });

        // Dropdown Menu Functionality
        const dropdownBtn = document.querySelector('.dropdown-btn');
        const dropdownContent = document.querySelector('.dropdown-content');
        const dropdownItems = document.querySelectorAll('.dropdown-item');
        const dropdownOutput = document.getElementById('dropdown-output');

        dropdownBtn.addEventListener('click', () => {
            dropdownContent.classList.toggle('open');
        });

        dropdownItems.forEach(item => {
            item.addEventListener('click', () => {
                dropdownOutput.textContent = `You selected: ${item.textContent}`;
                dropdownContent.classList.remove('open');
            });
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.dropdown')) {
                dropdownContent.classList.remove('open');
            }
        });

        // Tabbed Interface Functionality
        const tabBtns = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');

        tabBtns.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons and contents
                tabBtns.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Add active class to clicked button and corresponding content
                btn.classList.add('active');
                tabContents[index].classList.add('active');
            });
        });

        // Form Validation Functionality
        const form = document.getElementById('registration-form');
        const successMessage = document.getElementById('success-message');
        
        // Get all input fields
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        const confirmPasswordInput = document.getElementById('confirm-password');
        
        // Get error elements
        const nameError = document.getElementById('name-error');
        const emailError = document.getElementById('email-error');
        const passwordError = document.getElementById('password-error');
        const confirmPasswordError = document.getElementById('confirm-password-error');
        
        // Validate name field
        nameInput.addEventListener('blur', function() {
            if (nameInput.value.trim().length < 2) {
                showError(nameInput, nameError);
            } else {
                showSuccess(nameInput);
                hideError(nameError);
            }
        });
        
        // Validate email field
        emailInput.addEventListener('blur', function() {
            if (!isValidEmail(emailInput.value)) {
                showError(emailInput, emailError);
            } else {
                showSuccess(emailInput);
                hideError(emailError);
            }
        });
        
        // Validate password field
        passwordInput.addEventListener('blur', function() {
            if (!isStrongPassword(passwordInput.value)) {
                showError(passwordInput, passwordError);
            } else {
                showSuccess(passwordInput);
                hideError(passwordError);
            }
        });
        
        // Validate confirm password field
        confirmPasswordInput.addEventListener('blur', function() {
            if (confirmPasswordInput.value !== passwordInput.value) {
                showError(confirmPasswordInput, confirmPasswordError);
            } else {
                showSuccess(confirmPasswordInput);
                hideError(confirmPasswordError);
            }
        });
        
        // Form submission
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            
            // Validate all fields
            if (nameInput.value.trim().length < 2) {
                showError(nameInput, nameError);
                isValid = false;
            }
            
            if (!isValidEmail(emailInput.value)) {
                showError(emailInput, emailError);
                isValid = false;
            }
            
            if (!isStrongPassword(passwordInput.value)) {
                showError(passwordInput, passwordError);
                isValid = false;
            }
            
            if (confirmPasswordInput.value !== passwordInput.value) {
                showError(confirmPasswordInput, confirmPasswordError);
                isValid = false;
            }
            
            // If form is valid, show success message
            if (isValid) {
                successMessage.style.display = 'block';
                form.reset();
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 5000);
            }
        });
        
        // Helper functions for form validation
        function showError(input, errorElement) {
            input.style.borderColor = '#e63946';
            errorElement.style.display = 'block';
        }
        
        function showSuccess(input) {
            input.style.borderColor = '#2a9d8f';
        }
        
        function hideError(errorElement) {
            errorElement.style.display = 'none';
        }
        
        function isValidEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }
        
        function isStrongPassword(password) {
            const hasUpperCase = /[A-Z]/.test(password);
            const hasLowerCase = /[a-z]/.test(password);
            const hasNumbers = /\d/.test(password);
            const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
            const isLongEnough = password.length >= 8;
            
            return hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar && isLongEnough;
        }
    