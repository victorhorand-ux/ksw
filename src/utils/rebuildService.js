export const triggerCloudflareRebuild = async () => {
  const webhookUrl = import.meta.env.VITE_DEPLOY_WEBHOOK_URL;
  
  if (!webhookUrl) {
    console.warn('No Webhook URL found in environment variables. Skipping rebuild.');
    return;
  }

  try {
    // We don't need to await the response for the UI, we just fire and forget
    fetch(webhookUrl, { method: 'POST' });
    console.log('Cloudflare rebuild triggered successfully.');
  } catch (error) {
    console.error('Failed to trigger Cloudflare rebuild:', error);
  }
};