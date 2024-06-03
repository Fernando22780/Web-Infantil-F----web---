document.addEventListener('DOMContentLoaded', (event) => {
    const form = document.getElementById('clothing-form');
    const clothingContainer = document.getElementById('clothing-container');

    function loadSavedClothing() {
        const savedClothing = JSON.parse(localStorage.getItem('clothingItems')) || [];
        savedClothing.forEach(item => {
            addClothingToPage(item);
        });
    }

    function addClothingToPage(item) {
        const div = document.createElement('div');
        div.classList.add('clothing-item');
        div.dataset.name = item.name; 

        const img = document.createElement('img');
        img.src = item.imageUrl;
        div.appendChild(img);

        const detailsDiv = document.createElement('div');
        detailsDiv.classList.add('clothing-details');

        const name = document.createElement('p');
        name.textContent = `Nome: ${item.name}`;
        detailsDiv.appendChild(name);

        const size = document.createElement('p');
        size.textContent = `Tamanho: ${item.size}`;
        detailsDiv.appendChild(size);

        const description = document.createElement('p');
        description.textContent = `Descrição: ${item.description}`;
        detailsDiv.appendChild(description);

        const price = document.createElement('p');
        price.textContent = `Preço: R$${item.price}`;
        detailsDiv.appendChild(price);

        const removeButton = document.createElement('button');
        removeButton.classList.add('remove-button');
        removeButton.textContent = 'Remover';
        removeButton.addEventListener('click', () => {
            removeClothing(item.name);
        });

        div.appendChild(detailsDiv);
        div.appendChild(removeButton);
        clothingContainer.appendChild(div);
    }

    function saveClothing(item) {
        const savedClothing = JSON.parse(localStorage.getItem('clothingItems')) || [];
        savedClothing.push(item);
        localStorage.setItem('clothingItems', JSON.stringify(savedClothing));
    }

    function removeClothing(name) {
        let savedClothing = JSON.parse(localStorage.getItem('clothingItems')) || [];
        savedClothing = savedClothing.filter(item => item.name !== name);
        localStorage.setItem('clothingItems', JSON.stringify(savedClothing));
        loadClothingContainer();
    }

    function loadClothingContainer() {
        clothingContainer.innerHTML = '';
        loadSavedClothing();
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const itemName = document.getElementById('clothing-name').value;
        const itemSize = document.getElementById('clothing-size').value;
        const itemDescription = document.getElementById('clothing-description').value;
        const itemPrice = document.getElementById('clothing-price').value;
        const itemImageUrl = document.getElementById('clothing-image-url').value;

        if (itemImageUrl) {
            const clothingItem = {
                name: itemName,
                size: itemSize,
                description: itemDescription,
                price: itemPrice,
                imageUrl: itemImageUrl
            };

            addClothingToPage(clothingItem);
            saveClothing(clothingItem);
            form.reset();
        }
    });

    loadSavedClothing();
});