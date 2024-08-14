feather.replace();

        const sidebar = document.getElementById('sidebar');
        const logoContainer = document.querySelector('.logo-container');
        const bottomBar = document.querySelector('.bottom-bar');

        function toggleSidebar() {
            sidebar.classList.toggle('open');
            sidebar.classList.toggle('closed');
        }

        logoContainer.addEventListener('click', toggleSidebar);
        bottomBar.addEventListener('click', toggleSidebar);