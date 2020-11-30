document.addEventListener('DOMContentLoaded', function () {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);

  // By default, load the inbox
  load_mailbox('inbox');
});

function compose_email() {

  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';

  // Clear out composition fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';
}

function load_mailbox(mailbox) {

  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';

  // Show the mailbox name
  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;
  fetch(`/emails/${mailbox}`)
    .then(response => response.json())
    .then(emails => {
      emails.forEach((element) => {
        if (mailbox == 'inbox') {
          if (element.read) is_read = "read";
          else is_read = "";
        } else is_read = "";
        var item = document.createElement("div");
        item.className = `card   ${is_read} my-1 items`;

        item.innerHTML = `<div class="card-body" style="background-color: aqua"; id="item-${element.id}">
        
        ${element.subject} | ${element.sender} | ${element.timestamp}
        <br>
        ${element.body.slice(0, 100)}
      </div>`;
        document.querySelector("#emails-view").appendChild(item);
        // item.addEventListener("click", () => {
        //   show_mail(element.id, mailbox);
        // });
      });
    });
}