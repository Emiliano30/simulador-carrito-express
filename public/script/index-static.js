document.addEventListener('click', (e) => {
        const card = e.target.closest('.product-card');
        if (!card) return;

        const viewMode = card.querySelector('.view-mode');
        const editMode = card.querySelector('.edit-mode');


        if (e.target.classList.contains('btn-enable-edit-static')) {
            viewMode.style.display = 'none';
            editMode.style.display = 'block';
        }


        if (e.target.classList.contains('btn-cancel-edit-static')) {
            editMode.style.display = 'none';
            viewMode.style.display = 'block';
        }

        if (e.target.classList.contains('btn-delete-static')){
            const productId = e.target.getAttribute('data-id');

            Swal.fire({
                title: '¿Estás seguro?',
                text: "¡Esta acción no se puede revertir!",
                icon: 'warning',
                showCancelButton: true,
                background: '#2D004F', 
                color: '#fff',
                confirmButtonColor: '#FF3366', 
                cancelButtonColor: 'rgba(255, 255, 255, 0.1)',
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText: 'Cancelar'
            }).then((result) => {

                if (result.isConfirmed) {

                    const form = document.createElement('form');
                    form.method = 'POST';
                    form.action = `/delete-product/${productId}`;

                    document.body.appendChild(form);
                    form.submit();
                }
            });
        }
    });