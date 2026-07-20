// functions/product/[slug].js

export async function onRequestGet(context) {
  const { request, env, params } = context;
  const slug = params.slug;

  // 1. Fetch the raw index.html
  const response = await env.ASSETS.fetch(request);
  const projectId = env.VITE_FIREBASE_PROJECT_ID; 
  let product = null;

  try {
    // 🚀 Changed from a direct GET to the runQuery search endpoint
    const firebaseUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents:runQuery`;
    
    // 🚀 We send a POST request telling Firebase to search the "slug" field
    const fbResponse = await fetch(firebaseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        structuredQuery: {
          from: [{ collectionId: 'products' }],
          where: {
            fieldFilter: {
              field: { fieldPath: 'slug' },
              op: 'EQUAL',
              value: { stringValue: slug }
            }
          },
          limit: 1
        }
      })
    });
    
    const fbData = await fbResponse.json();

    // 🚀 runQuery returns an array. We check if the first result has a document
    if (fbData && fbData.length > 0 && fbData[0].document) {
      const fields = fbData[0].document.fields;
      product = {
        name: fields.name?.stringValue || 'Product',
        description: fields.description?.stringValue || 'Check out this product at Kigali Swim Shop',
        image: fields.image?.stringValue || '' 
      };
    }
  } catch (error) {
    console.error("Failed to query product for OG tags", error);
  }

  // 3. If the fetch failed or product doesn't exist, just return the normal React app
  if (!product) {
    return response;
  }

  // 4. Inject the tags into the HTML <head> for social media bots
  return new HTMLRewriter()
    .on('head', {
      element(element) {
        element.append(`<meta property="og:title" content="${product.name}" />`, { html: true });
        element.append(`<meta property="og:description" content="${product.description}" />`, { html: true });
        if (product.image) {
          element.append(`<meta property="og:image" content="${product.image}" />`, { html: true });
          element.append(`<meta property="og:image:width" content="1200" />`, { html: true });
          element.append(`<meta property="og:image:height" content="630" />`, { html: true });
        }
        element.append(`<meta name="twitter:card" content="summary_large_image" />`, { html: true });
      }
    })
    .transform(response);
}