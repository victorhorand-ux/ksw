export const triggerCloudflareRebuild = async () => {
  const webhookUrl = import.meta.env.VITE_DEPLOY_WEBHOOK_URL;
  
  if (!webhookUrl) {
    console.warn('No Webhook URL found in environment variables. Skipping rebuild.');
    return;
  }

  try {
    // 🚀 'no-cors' prevents the browser block, and 'await' ensures 
    // the try/catch block can safely intercept any network issues.
    await fetch(webhookUrl, { 
      method: 'POST',
      mode: 'no-cors' 
    });
    
    console.log('Cloudflare rebuild triggered successfully.');
  } catch (error) {
    console.error('Failed to trigger Cloudflare rebuild:', error);
  }
};