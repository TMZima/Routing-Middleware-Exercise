document.addEventListener("DOMContentLoaded", () => {
  const itemsList = document.getElementById("items-list");
  const addItemForm = document.getElementById("add-item-form");
  const itemNameInput = document.getElementById("item-name");
  const itemPriceInput = document.getElementById("item-price");

  async function fetchItems() {
    const response = await fetch("/items");
    const items = await response.json();
    itemsList.innerHTML = "";
    items.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = `${item.name}: $${parseFloat(item.price).toFixed(2)}`;

      // Add update button
      const updateButton = document.createElement("button");
      updateButton.textContent = "Update";
      updateButton.classList.add("update");
      updateButton.addEventListener("click", () => showUpdateForm(item, li));
      li.appendChild(updateButton);

      // Add delete button
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.classList.add("delete");
      deleteButton.addEventListener("click", () => deleteItem(item.id, li));
      li.appendChild(deleteButton);

      itemsList.appendChild(li);
    });
  }

  function showUpdateForm(item, li) {
    const updateForm = document.createElement("form");
    updateForm.classList.add("update-form");

    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.value = item.name;
    updateForm.appendChild(nameInput);

    const priceInput = document.createElement("input");
    priceInput.type = "number";
    priceInput.step = "0.01";
    priceInput.value = item.price;
    updateForm.appendChild(priceInput);

    const saveButton = document.createElement("button");
    saveButton.textContent = "Save";
    saveButton.addEventListener("click", async (e) => {
      e.preventDefault();
      await updateItem(item.id, nameInput.value, priceInput.value);
      updateForm.remove();
    });
    updateForm.appendChild(saveButton);

    const cancelButton = document.createElement("button");
    cancelButton.textContent = "Cancel";
    cancelButton.addEventListener("click", (e) => {
      e.preventDefault();
      updateForm.remove();
    });
    updateForm.appendChild(cancelButton);

    li.appendChild(updateForm);
  }

  async function updateItem(id, newName, newPrice) {
    await fetch(`/items/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newName,
        price: parseFloat(newPrice).toFixed(2),
      }),
    });
    fetchItems();
  }

  async function deleteItem(id, li) {
    const response = await fetch(`/items/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      li.remove();
    } else {
      const error = await response.json();
      alert(`Error: ${error.error}`);
    }
  }

  addItemForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const newItem = {
      name: itemNameInput.value,
      price: parseFloat(itemPriceInput.value).toFixed(2),
    };
    await fetch("/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newItem),
    });
    itemNameInput.value = "";
    itemPriceInput.value = "";
    fetchItems();
  });

  fetchItems();
});
