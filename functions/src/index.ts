const functions = require('firebase-functions')
const admin = require('firebase-admin')

admin.initializeApp(functions.config().firebase);

exports.stripeCharge = functions.database.ref('/payments/{userId}/{paymentId}').onWrite(event => {
  const payment = event.data.val();
  const userId = event.params.userId;
  const paymentId = event.params.paymentId;
  const stripe = require('stripe')("sk_test_npY7avPIio3grdAbMEYBeieP"); //stripe con chiave test segreta

  // checks if payment exists or if it has already been charged
  if (!payment || payment.charge) return;

  return admin.database().ref(`/users/${userId}`).once('value').then(snapshot => {
                  return snapshot.val();
               }).then(customer => {
                 const amount = payment.amount;
                 const idempotency_key = paymentId;  // prevent duplicate charges
                 const source = payment.token.id;
                 const currency = 'usd';
                 const description = "Example charge";
                 const metadata = {request_id: 100001}; //salva nel metadata un campo che vogliamo (potremmo mettere numero richiesta cosi si indentifica easy)
                 const statement_descriptor = "ACCREDITO ALPHABAG"; //motivazione accredito
                 const charge = {amount, currency, source, description, statement_descriptor, metadata};
                 return stripe.charges.create(charge, { idempotency_key });
               }).then(charge => {
                   admin.database().ref(`/payments/${userId}/${paymentId}/charge`).set(charge)
                  })
                  .catch(err => {
                    console.log("errore gigante");
                  });
});