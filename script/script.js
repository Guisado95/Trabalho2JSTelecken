
// === Cabeçalho ===
(() => {
  const headerPreview = document.getElementById('headerPreview');
  const headerBgColor = document.getElementById('headerBgColor');
  const elementType = document.getElementById('elementType');
  const elementText = document.getElementById('elementText');
  const elementImage = document.getElementById('elementImage');
  const elementBgColor = document.getElementById('elementBgColor');
  const elementTextColor = document.getElementById('elementTextColor');
  const elementBorder = document.getElementById('elementBorder');
  const elementSize = document.getElementById('elementSize');
  const addHeaderElement = document.getElementById('addHeaderElement');
  const resetHeaderForm = document.getElementById('resetHeaderForm');
  const textInputContainer = document.getElementById('textInputContainer');
  const imageInputContainer = document.getElementById('imageInputContainer');

  let editingElement = null;

  headerBgColor.addEventListener('input', () => {
    headerPreview.style.backgroundColor = headerBgColor.value;
  });

  elementType.addEventListener('change', () => {
    if (elementType.value === 'image') {
      textInputContainer.classList.add('d-none');
      imageInputContainer.classList.remove('d-none');
    } else {
      textInputContainer.classList.remove('d-none');
      imageInputContainer.classList.add('d-none');
    }
    resetElementFields();
  });

  function resetElementFields() {
    elementText.value = '';
    elementImage.value = '';
    elementBgColor.value = '#eeeeee';
    elementTextColor.value = '#000000';
    elementBorder.value = 'none';
    elementSize.value = 150;
    editingElement = null;
    addHeaderElement.textContent = 'Adicionar / Atualizar Elemento';
  }

  resetHeaderForm.addEventListener('click', () => {
    resetElementFields();
  });

  addHeaderElement.addEventListener('click', () => {
    if (!editingElement && headerPreview.children.length >= 3) {
      alert('Limite de 3 elementos no cabeçalho atingido.');
      return;
    }

    if (elementType.value === 'text') {
      if (!elementText.value.trim()) {
        alert('Digite algum texto para o elemento.');
        return;
      }
    } else {
      if (!elementImage.files[0] && !editingElement) {
        alert('Escolha uma imagem para o elemento.');
        return;
      }
    }

    if (editingElement) {
      updateElement(editingElement);
    } else {
      createElement();
    }
    resetElementFields();
  });

  function createElement() {
    const el = document.createElement('div');
    el.style.backgroundColor = elementBgColor.value;
    el.style.color = elementTextColor.value;
    el.style.border = elementBorder.value === 'none' ? 'none' : `2px ${elementBorder.value} black`;
    el.style.width = el.style.height = elementSize.value + 'px';
    el.style.display = 'flex';
    el.style.justifyContent = 'center';
    el.style.alignItems = 'center';
    el.style.cursor = 'pointer';
    el.style.borderRadius = '6px';
    el.style.overflow = 'hidden';
    el.style.textAlign = 'center';

    if (elementType.value === 'text') {
      el.textContent = elementText.value;
    } else {
      const file = elementImage.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = document.createElement('img');
        img.src = e.target.result;
        img.style.maxWidth = '100%';
        img.style.maxHeight = '100%';
        img.style.objectFit = 'contain';
        el.appendChild(img);
      };
      reader.readAsDataURL(file);
    }

    el.addEventListener('click', () => editElement(el));
    headerPreview.appendChild(el);
  }

  function updateElement(el) {
    el.style.backgroundColor = elementBgColor.value;
    el.style.color = elementTextColor.value;
    el.style.border = elementBorder.value === 'none' ? 'none' : `2px ${elementBorder.value} black`;
    el.style.width = el.style.height = elementSize.value + 'px';

    if (elementType.value === 'text') {
      el.innerHTML = elementText.value;
    } else {
      if (elementImage.files[0]) {
        const file = elementImage.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
          el.innerHTML = '';
          const img = document.createElement('img');
          img.src = e.target.result;
          img.style.maxWidth = '100%';
          img.style.maxHeight = '100%';
          img.style.objectFit = 'contain';
          el.appendChild(img);
        };
        reader.readAsDataURL(file);
      }
    }
  }

  function editElement(el) {
    editingElement = el;
    addHeaderElement.textContent = 'Atualizar Elemento';

    elementBgColor.value = rgbToHex(window.getComputedStyle(el).backgroundColor);
    elementTextColor.value = rgbToHex(window.getComputedStyle(el).color);
    elementBorder.value = getBorderStyle(window.getComputedStyle(el).borderStyle);
    elementSize.value = parseInt(window.getComputedStyle(el).width);

    if (el.querySelector('img')) {
      elementType.value = 'image';
      textInputContainer.classList.add('d-none');
      imageInputContainer.classList.remove('d-none');
    } else {
      elementType.value = 'text';
      textInputContainer.classList.remove('d-none');
      imageInputContainer.classList.add('d-none');
    }

    if (elementType.value === 'text') {
      elementText.value = el.textContent;
    } else {
      elementText.value = '';
      elementImage.value = '';
    }
  }

  function rgbToHex(rgb) {
    const result = /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/.exec(rgb);
    return result
      ? "#" +
          [1, 2, 3]
            .map((n) => parseInt(result[n]).toString(16).padStart(2, "0"))
            .join("")
      : "#000000";
  }

  function getBorderStyle(style) {
    if (style === 'none') return 'none';
    if (style === 'solid') return 'solid';
    if (style === 'dashed') return 'dashed';
    if (style === 'dotted') return 'dotted';
    return 'none';
  }
})();

// === Menu ===
(() => {
  const menuPreview = document.getElementById('menuPreview');
  const menuBgColor = document.getElementById('menuBgColor');
  const menuTextColor = document.getElementById('menuTextColor');
  const menuItemText = document.getElementById('menuItemText');
  const menuBorderStyle = document.getElementById('menuBorderStyle');
  const addMenuItemBtn = document.getElementById('addMenuItem');
  const clearMenuBtn = document.getElementById('clearMenu');

  addMenuItemBtn.addEventListener('click', () => {
    if (!menuItemText.value.trim()) return;

    const item = document.createElement('div');
    item.className = 'menu-item';
    item.textContent = menuItemText.value;
    item.style.color = menuTextColor.value;
    item.style.border = `1px ${menuBorderStyle.value} black`;

    menuPreview.appendChild(item);
    menuItemText.value = '';
  });

  clearMenuBtn.addEventListener('click', () => {
    menuPreview.innerHTML = '';
  });

  menuBgColor.addEventListener('input', () => {
    menuPreview.style.backgroundColor = menuBgColor.value;
  });
})();

// GALERIA
const galleryPreview = document.getElementById('galleryPreview');
const cardBgColor = document.getElementById('cardBgColor');
const cardTextColor = document.getElementById('cardTextColor');
const cardBorderStyle = document.getElementById('cardBorderStyle');
const cardWidth = document.getElementById('cardWidth');
const cardHeight = document.getElementById('cardHeight');
const cardImageInput = document.getElementById('cardImage');
const cardDescriptionInput = document.getElementById('cardDescription');

document.getElementById('addCard').addEventListener('click', () => {
  const description = cardDescriptionInput.value.trim();
  if (!description) return alert('Digite a descrição do card.');
  
  const file = cardImageInput.files[0];
  if (!file) return alert('Selecione uma imagem para o card.');

  const reader = new FileReader();
  reader.onload = function(e) {
    const card = document.createElement('div');
    card.className = 'gallery-card';
    card.style.backgroundColor = cardBgColor.value;
    card.style.color = cardTextColor.value;
    card.style.border = `2px ${cardBorderStyle.value} black`;
    card.style.width = cardWidth.value + 'px';
    card.style.height = cardHeight.value + 'px';

    const img = document.createElement('img');
    img.src = e.target.result;
    img.alt = description;

    const desc = document.createElement('div');
    desc.className = 'gallery-card-description';
    desc.textContent = description;

    card.appendChild(img);
    card.appendChild(desc);

    galleryPreview.appendChild(card);

    // Limpar campos
    cardDescriptionInput.value = '';
    cardImageInput.value = '';
  };
  reader.readAsDataURL(file);
});

document.getElementById('clearGallery').addEventListener('click', () => {
  galleryPreview.innerHTML = '';
});

// --- Editor de Formulário ---

const formTitle = document.getElementById('formTitle');
const formBgColor = document.getElementById('formBgColor');
const formBorderStyle = document.getElementById('formBorderStyle');
const formFieldsContainer = document.getElementById('formFieldsContainer');
const formPreview = document.getElementById('formPreview');
const addFormFieldBtn = document.getElementById('addFormField');
const clearFormBtn = document.getElementById('clearForm');

let formFields = []; // Array para armazenar campos do formulário

function renderFormPreview() {
  formPreview.innerHTML = '';

  formPreview.style.backgroundColor = formBgColor.value;
  formPreview.style.border = formBorderStyle.value === 'none' ? 'none' : `2px ${formBorderStyle.value} black`;

  if (formTitle.value.trim()) {
    const titleEl = document.createElement('h4');
    titleEl.textContent = formTitle.value.trim();
    formPreview.appendChild(titleEl);
  }

  formFields.forEach((field, index) => {
    const fieldWrapper = document.createElement('div');
    fieldWrapper.style.marginBottom = '10px';

    const label = document.createElement('label');
    label.textContent = field.label;
    label.style.display = 'block';
    label.style.fontWeight = '600';

    let input;

    switch (field.type) {
      case 'text':
      case 'email':
      case 'date':
        input = document.createElement('input');
        input.type = field.type;
        input.className = 'form-control';
        break;
      case 'radio':
        input = document.createElement('div');
        field.options.forEach(option => {
          const radioWrapper = document.createElement('div');
          radioWrapper.className = 'form-check form-check-inline';

          const radioInput = document.createElement('input');
          radioInput.type = 'radio';
          radioInput.name = `radio-${index}`;
          radioInput.className = 'form-check-input';

          const radioLabel = document.createElement('label');
          radioLabel.className = 'form-check-label';
          radioLabel.textContent = option;

          radioWrapper.appendChild(radioInput);
          radioWrapper.appendChild(radioLabel);
          input.appendChild(radioWrapper);
        });
        break;
      case 'select':
        input = document.createElement('select');
        input.className = 'form-select';
        field.options.forEach(option => {
          const opt = document.createElement('option');
          opt.value = option;
          opt.textContent = option;
          input.appendChild(opt);
        });
        break;
      default:
        input = document.createElement('input');
        input.type = 'text';
        input.className = 'form-control';
    }

    fieldWrapper.appendChild(label);
    fieldWrapper.appendChild(input);

    // Botão remover campo
    const removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.textContent = 'Remover';
    removeBtn.className = 'btn btn-sm btn-danger ms-2';
    removeBtn.addEventListener('click', () => {
      formFields.splice(index, 1);
      renderFormFieldsEditor();
      renderFormPreview();
    });

    fieldWrapper.appendChild(removeBtn);
    formPreview.appendChild(fieldWrapper);
  });
}

function renderFormFieldsEditor() {
  formFieldsContainer.innerHTML = '';

  formFields.forEach((field, index) => {
    const fieldDiv = document.createElement('div');
    fieldDiv.className = 'form-field';

    const labelLabel = document.createElement('label');
    labelLabel.textContent = 'Label do campo:';
    labelLabel.htmlFor = `field-label-${index}`;
    fieldDiv.appendChild(labelLabel);

    const labelInput = document.createElement('input');
    labelInput.type = 'text';
    labelInput.id = `field-label-${index}`;
    labelInput.value = field.label;
    labelInput.className = 'form-control mb-2';
    labelInput.addEventListener('input', (e) => {
      formFields[index].label = e.target.value;
      renderFormPreview();
    });
    fieldDiv.appendChild(labelInput);

    const typeLabel = document.createElement('label');
    typeLabel.textContent = 'Tipo do campo:';
    typeLabel.htmlFor = `field-type-${index}`;
    fieldDiv.appendChild(typeLabel);

    const typeSelect = document.createElement('select');
    typeSelect.id = `field-type-${index}`;
    typeSelect.className = 'form-select mb-2';
    ['text', 'email', 'date', 'radio', 'select'].forEach(type => {
      const option = document.createElement('option');
      option.value = type;
      option.textContent = type;
      if (type === field.type) option.selected = true;
      typeSelect.appendChild(option);
    });
    typeSelect.addEventListener('change', (e) => {
      formFields[index].type = e.target.value;
      if (e.target.value === 'radio' || e.target.value === 'select') {
        if (!formFields[index].options) formFields[index].options = ['Opção 1', 'Opção 2'];
      } else {
        formFields[index].options = [];
      }
      renderFormFieldsEditor();
      renderFormPreview();
    });
    fieldDiv.appendChild(typeSelect);

    if (field.type === 'radio' || field.type === 'select') {
      const optionsLabel = document.createElement('label');
      optionsLabel.textContent = 'Opções (separadas por vírgula):';
      fieldDiv.appendChild(optionsLabel);

      const optionsInput = document.createElement('input');
      optionsInput.type = 'text';
      optionsInput.value = field.options.join(', ');
      optionsInput.className = 'form-control';
      optionsInput.addEventListener('input', (e) => {
        formFields[index].options = e.target.value.split(',').map(opt => opt.trim());
        renderFormPreview();
      });
      fieldDiv.appendChild(optionsInput);
    }

    formFieldsContainer.appendChild(fieldDiv);
  });
}

// Eventos dos botões
addFormFieldBtn.addEventListener('click', () => {
  formFields.push({
    label: 'Novo campo',
    type: 'text',
    options: []
  });
  renderFormFieldsEditor();
  renderFormPreview();
});

clearFormBtn.addEventListener('click', () => {
  formTitle.value = '';
  formBgColor.value = '#ffffff';
  formBorderStyle.value = 'none';
  formFields = [];
  formFieldsContainer.innerHTML = '';
  formPreview.innerHTML = '';
});

// Eventos para atualização em tempo real
formTitle.addEventListener('input', renderFormPreview);
formBgColor.addEventListener('input', renderFormPreview);
formBorderStyle.addEventListener('change', renderFormPreview);

// Inicialização com um campo padrão
formFields.push({
  label: 'Novo campo',
  type: 'text',
  options: []
});
renderFormFieldsEditor();
renderFormPreview();

// ==== Rodapé ====
document.getElementById('updateFooter').addEventListener('click', () => {
  const text = document.getElementById('footerText').value;
  const bgColor = document.getElementById('footerBgColor').value;
  const textColor = document.getElementById('footerTextColor').value;
  const textAlign = document.getElementById('footerTextAlign').value;

  const footer = document.getElementById('footerPreview');
  footer.textContent = text;
  footer.style.backgroundColor = bgColor;
  footer.style.color = textColor;
  footer.style.textAlign = textAlign;
});

function gerarCodigo() {
  const menuHTML = document.getElementById('menuPreview').outerHTML;
  const formHTML = document.getElementById('formPreview')?.outerHTML || '';
  const footerHTML = document.getElementById('footerPreview').outerHTML;

  const codigoCompleto = `
<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Título da Página</title>
</head>
<body>
${menuHTML}
${formHTML}
${footerHTML}
</body>
</html>`.trim();

  document.getElementById('codigoGerado').textContent = codigoCompleto;
}

function gerarHtmlCompleto(conteudo) {
      return `<!DOCTYPE html>
<html lang="pt-br">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Título da Página</title>
</head>
<body>
${conteudo}
</body>
</html>`;
    }

    function mostrarCodigo() {
      const conteudo = document.getElementById("editor").innerHTML;
      const htmlCompleto = gerarHtmlCompleto(conteudo);
      document.getElementById("codigo").textContent = htmlCompleto;
    }

    function salvarCodigo() {
      const conteudo = document.getElementById("editor").innerHTML;
      const htmlCompleto = gerarHtmlCompleto(conteudo);
      localStorage.setItem("codigoHTML", htmlCompleto);
      alert("Código HTML salvo no localStorage!");
    }