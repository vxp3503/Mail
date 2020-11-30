document.addEventListener('DOMContentLoaded', function(){
   recip = document.querySelector('#compose-recipients')
   sub = document.querySelector('#compose-subject')
   msg = document.querySelector('#compose-body')
  document.querySelector('#compose-form').addEventListener('submit', (event)=>{
      event.preventDefault();
    if(recip.length == 0){
      return;
    }
    fetch('/emails', {
      method: 'POST',
      body: JSON.stringify({
          recipients: recip.value,
          subject: sub.value,
          body: msg.value
      }),
    })
    .then(response => response.json())
    .then(result => {
        console.log(result.status);
        if(result.status==201){
          load_mailbox('sent');
        }
        else{
          alert(`${result.error}`)
        }
    });
  })
},
false
)

