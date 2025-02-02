module.exports.config = {
  name: 'The Script of Everything',
  author: 'Yan Maglinte',
  version: '1.0',
  description: 'Allows you to input code here without the need for prefixes or names; it will execute automatically.',
  selfListen: false,
};

let enter = false;
module.exports.run = async function({ event, args }) {
  if (event.type === 'message' && !enter) {
    api.graph({
      recipient: {
        id: event.sender.id
      },
      message: {
        attachment: {
          type: 'template',
          payload: {
            template_type: 'generic',
            elements: [
              {
               title: 'Hey there Uzuki Mikata Users!', // The title of the generic message
                subtitle: 'This Project is supported by PageBot. Leave a like on their repository and support their work, again thanks for letting me using your build Yan Maglinte!', // The subtitle of the message
                image_url: 'https://img.photouploads.com/file/PhotoUploads-com/SKhN.jpg', // The image URL
                buttons: [
                 
                  {
                   type: 'web_url',
                    url: 'https://www.facebook.com/XyryllPanget',
                    title: 'Check My Owner profile'
                  },
                  {
                    type: 'postback',
                    title: `${PREFIX}help`,
                    payload: 'HELP_PAYLOAD'
                  }
                ]
              }
            ]
          }
        }
      }
    });
    enter = true;
  };

  /** EVENT TYPES
   * postback
   * quick_reply
   * message_reaction
   * message_reply
   * message
   * mark_as_seen
   * @YanMaglinte **/
};
