const form=document.querySelector('form');
const list=document.querySelector('#list');

form.submit.addEventListener('click',(e)=>{
    e.preventDefault();
    if(form.aName.value==="" || form.quote.value===""){
        alert("Fill all fields before submitting");
    }else{
        const quote={
            name:form.aName.value,
            quote:form.quote.value
        }
        db.collection('Quotes').add(quote).then(data=>{
            alert('Data stored')
          form.aName.value=""
          form.quote.value=""
        }).catch(err=>{
            console.log(err)
        })
    }

   
})

const addItems=(quoteData,id)=>{
    const html=`
    <li data-id=${id} class="quote">
    <div id="auth-name">${quoteData.name}</div>
    <div>${quoteData.quote}</div>
    <button class="btn-primary">Delete</button>
    </li>
    `
    list.innerHTML+=html;
}

const deleteItem=(id)=>{
   const quoteArray= document.querySelectorAll('.quote');
   quoteArray.forEach((quote)=>{
       if(quote.getAttribute('data-id')===id){
           quote.remove();
       }
   })
}

list.addEventListener('click',(e)=>{
    if(e.target.tagName==="BUTTON"){
       db.collection('Quotes').doc(e.target.parentElement.getAttribute('data-id')).delete().then((data)=>{
           alert('Data deleted');
       }).catch(err=>console.log(err))
    }
})

db.collection('Quotes').onSnapshot(data=>{
   data.docChanges().forEach((item)=>{
      if(item.type==='added'){
       addItems(item.doc.data(),item.doc.id)
      }else if(item.type==='removed'){
          deleteItem(item.doc.id)
      }
   })
})