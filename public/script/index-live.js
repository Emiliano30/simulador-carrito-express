
const socket = io();

const productCard = document.querySelector('.productCard');
const productTemplate = document.getElementById('product-template');


socket.emit('getProducts');

const liveProductForm = document.getElementById('liveProductForm');

if (liveProductForm) {
  liveProductForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const fileInput = document.getElementById('thumbnail');
    const file = fileInput.files[0];

    const precio = Number(document.getElementById('price').value);
    const stock = Number(document.getElementById('stock').value);

    if (precio <= 0 || stock <= 0) {
      return Swal.fire({
        icon: 'error',
        title: 'Valores inválidos',
        text: 'El precio y el stock deben ser números positivos mayores a 0.',
        background: '#2D004F',
        color: '#fff',
        confirmButtonColor: '#00E5FF'
      });
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      const productData = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        code: document.getElementById('code').value,
        price: precio,
        stock: stock,
        category: document.getElementById('category').value,
        imageBuffer: reader.result,
        imageName: file ? file.name : 'default.jpg'
      };

      socket.emit('addProduct', productData);
      liveProductForm.reset();
    };

    if (file) {
      reader.readAsDataURL(file);
    } else {
      Swal.fire({
        icon: 'info',
        title: 'Falta la imagen',
        text: 'Por favor, selecciona una imagen para el producto.',
        background: '#2D004F',
        color: '#fff',
        confirmButtonColor: '#8B005D'
      });
    }
  });
}


socket.on('productsList', (products) => {
  productCard.innerHTML = '';

  products.forEach(p => {
    const clone = productTemplate.content.cloneNode(true);

    const productDiv = clone.querySelector('.product');
    productDiv.id = `product-${p.id}`;

    clone.querySelector('.p-title').textContent = p.title;
    clone.querySelector('.p-price').textContent = p.price;
    clone.querySelector('.p-stock').textContent = p.stock;
    clone.querySelector('.p-category').textContent = p.category;
    
    const img = clone.querySelector('.p-img');
    img.src = p.thumbnails && p.thumbnails[0] ? p.thumbnails[0] : '';
    img.alt = p.title;


    clone.querySelector('.edit-price').value = p.price;
    clone.querySelector('.edit-stock').value = p.stock;


    clone.querySelector('.btn-delete').setAttribute('data-id', p._id);
    clone.querySelector('.btn-save-edit').setAttribute('data-id', p._id);


    productCard.appendChild(clone);
  });
});


productCard.addEventListener('click', (e) => {
  const productDiv = e.target.closest('.product');
  if (!productDiv) return;

  const viewMode = productDiv.querySelector('.view-mode');
  const editMode = productDiv.querySelector('.edit-mode');

  if (e.target.classList.contains('btn-enable-edit')) {
    viewMode.classList.add('hidden');
    editMode.classList.add('visible');
  }

  if (e.target.classList.contains('btn-cancel-edit')) {
    editMode.classList.remove('visible');
    viewMode.classList.remove('hidden');
  }

  if (e.target.classList.contains('btn-save-edit')) {
    const productId = e.target.getAttribute('data-id');
    const nuevoPrecio = productDiv.querySelector('.edit-price').value;
    const nuevoStock = productDiv.querySelector('.edit-stock').value;

    if (nuevoPrecio <= 0 || nuevoStock <= 0) {
      return Swal.fire({
        icon: 'error',
        title: 'Error al actualizar',
        text: 'No se admiten precios o stock menores o iguales a cero.',
        background: '#2D004F',
        color: '#fff',
        confirmButtonColor: '#00E5FF'
      });
    }

    const updatedData = {
      price: Number(nuevoPrecio),
      stock: Number(nuevoStock)
    };

    socket.emit('updateProduct', productId, updatedData);
  }

  if (e.target.classList.contains('btn-delete')) {
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
        if (result.isConfirmed) {socket.emit('deleteProduct', productId);}});
  }
});

socket.on('error', (error) => {
  console.error('Error del socket:', error);
});