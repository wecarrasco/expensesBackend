const axios = require('axios');

exports.sendSavingsNotification = async (req, res) => {
  const user = req.server.info.id.substring(0, req.server.info.id.indexOf(':'));

  const body = {
    active: true,
    body: 'Your savings for the week are over.',
    created: 1.412047948579029e9,
    direction: 'self',
    dismissed: false,
    iden: 'ujpah72o0sjAoRtnM0jc',
    modified: 1.412047948579031e9,
    receiver_email: 'waemcame@hotmail.es',
    receiver_email_normalized: 'waemcame@hotmail.es',
    receiver_iden: 'ujEq81XMn8esjAyfFcuNoG',
    sender_email: 'waemcame@hotmail.es',
    sender_email_normalized: 'waemcame@hotmail.es',
    sender_iden: 'ujEq81XMn8esjAyfFcuNoG',
    sender_name: 'Walther Carrasco',
    title: 'Savings Alert',
    type: 'note'
  };
  axios
    .post('https://api.pushbullet.com/v2/pushes', body, {
      headers: {
        'Access-Token': 'o.eOWnMp7BEQspav3NP57HcsMa1uyC58yg',
        'Content-Type': 'application/json'
      }
    })
    .then((res) => {
      console.log(`Action: Notification - Savings Alert - User: ${user}`);
    });
  return true;
};
