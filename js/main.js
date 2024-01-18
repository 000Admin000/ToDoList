let display = document.getElementById('input'),
    addBtn = document.getElementById('add-btn'),
    allClearBtn = document.getElementById('all-clear-btn'),
    amountDisplay = document.getElementById('amount'),
    list = document.getElementById('list'),
    amountCount = 0;
    
    addBtn.addEventListener('click', addBtnPress);   
    allClearBtn.addEventListener('click', allClearBtnPress);  

    
    function Reload() {
        let saveArrCount = localStorage.getItem('amountCount');
        if(saveArrCount > 0) {
            for(let i = 0; i < saveArrCount; i++) {
                let saveItem = localStorage.getItem('item-' + i);
                if(saveItem !== null) {
                    let itemInfo = '<div class="todo-item-box"><div class="todo-item" id="item-'+ i +'">'+ saveItem +'</div><div class="todo-clear btn" id="'+ i +'">-</div></div>';
                    list.innerHTML += itemInfo;
                    amountCount++;
                };
            };
            amountChange();
            clearUpdate();      
        };
    };

    Reload();

    let saveArrCount = 0;

    function addBtnPress() {
        let newItem = display.value;

        newItem = newItem.replace(/^\s+|\s+$/g, '');
        if(newItem !== '') {
            if(amountCount > 0) {
                saveArrCount = localStorage.getItem('amountCount');
            }
            let itemInfo = '<div class="todo-item-box"><div class="todo-item" id="item-'+ saveArrCount+'">'+ newItem +'</div><div class="todo-clear btn" id="'+ saveArrCount +'">-</div></div>';
            list.innerHTML += itemInfo; 
            display.value = '';
            localStorage.setItem('item-' + saveArrCount, newItem);
            amountCount++;
            saveArrCount++;
            if(amountCount > 0) {
                localStorage.setItem('amountCount', saveArrCount);
            } else {
                localStorage.setItem('amountCount', 0);
            };
            clearUpdate();
            amountChange();
        } else {
            display.value = '';
        };
    };

    function allClearBtnPress() {
        if(amountCount > 0) {
            list.innerHTML = '';
            for(let i = 0; i < amountCount; i++) {
                localStorage.removeItem('item-' + i);
            };
            amountCount = 0;
            amountChange();
            saveArrCount = localStorage.getItem('amountCount');
            for(let i = 0; i < saveArrCount; i++) {
                localStorage.removeItem('item-' + i);
            };
            localStorage.setItem('amountCount', 0);
            saveArrCount = 0;
        }
    };

    function oneClearBtnPress(id) {
        let cleanItem = document.getElementById(id);
        cleanItem.parentNode.remove(cleanItem);
        amountCount--;
        amountChange();
        localStorage.removeItem('item-' + id);
        if(amountCount === 0) {
            localStorage.setItem('amountCount', 0);
            saveArrCount = 0;
        } else {
            localStorage.setItem('amountCount', parseInt(localStorage.getItem('amountCount')) + 1);

        };
    };

    function amountChange() {
        amountDisplay.innerHTML = 'You have '+ amountCount +' pending tasks';
    };

    function clearUpdate() {
        if(amountCount > 0) {
            let oneClearBtns = document.querySelectorAll('.todo-clear');   
            for (let i = 0; i < oneClearBtns.length; i++) {
                let oneClearBtn = oneClearBtns[i];
                oneClearBtn.addEventListener('click', function(e) {
                    oneClearBtnPress(e.srcElement.id);
                }); 
            };
        };
    };

