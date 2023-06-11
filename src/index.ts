import { App,AwsLambdaReceiver } from '@slack/bolt';
import { AwsEvent, AwsCallback } from '@slack/bolt/dist/receivers/AwsLambdaReceiver';

const awsLambdaReceiver = new AwsLambdaReceiver({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});


const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  // receiver: awsLambdaReceiver,

});

// Listens to incoming messages that contain "hello"
app.message('', async ({ message, say }) => {
  // say() sends a message to the channel where the event was triggered
  console.log(message);
  say(`Hey there <@${message}>!`);
});

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app is running!');
})();


module.exports.handler = async (event: AwsEvent, context: any, callback: AwsCallback) => {
  const handler = await awsLambdaReceiver.start();
  return handler(event, context, callback);
}