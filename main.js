const myForm=document.getElementById('addForm')
const expList=document.getElementById('expense-list')
myForm.addEventListener('submit',addExpense)

function addExpense(e){
    e.preventDefault()
    let expInput=document.getElementById('expense').value
    let descInput=document.getElementById('desc').value
    let categInput=document.getElementById('category').value
    let expObj={
        expense:expInput,
        description:descInput,
        category:categInput
    }
    
    let expObj_serialized=JSON.stringify(expObj)
    localStorage.setItem(descInput,expObj_serialized)
    let newExpense=document.createElement('li')
    newExpense.className="list-group-item"
    newExpense.innerHTML=`${categInput}::${expInput}::${descInput}`
    let delBtn=document.createElement('button')
    delBtn.innerText="Delete"
    delBtn.className="btn btn-danger btn-sm float-right delete"
    delBtn.addEventListener('click',removeExpense)

    function removeExpense(event){
        let expToRemove = event.target.parentElement.firstChild.textContent.split('::')[2]
        expToRemove = expToRemove.trim()
        localStorage.removeItem(expToRemove)
        expList.removeChild(newExpense)
    }

    let edBtn=document.createElement('button')
    edBtn.innerText="Edit"
    edBtn.className="btn btn-success btn-sm float-right"
    edBtn.addEventListener('click',editExpense)

    function editExpense(event){
        let expToEdit = event.target.parentElement.firstChild.textContent.split('::')[1]
        let descToEdit = event.target.parentElement.firstChild.textContent.split('::')[2]
        console.log(descToEdit)
        localStorage.removeItem(descToEdit)
        expToEdit = expToEdit.trim()
        descToEdit=descToEdit.trim()
        expList.removeChild(newExpense)
        document.getElementById('expense').value=expToEdit
        document.getElementById('desc').value=descToEdit
    }

    newExpense.appendChild(delBtn)
    newExpense.appendChild(edBtn)
    expList.appendChild(newExpense)
    myForm.reset()
}
