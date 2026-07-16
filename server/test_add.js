const fs = require('fs');

async function test() {
  try {
    // 1. Login
    const loginRes = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@kubdejewellers.com', password: 'KubdeAdmin@2024' })
    });
    if (!loginRes.ok) throw new Error(await loginRes.text());
    const loginData = await loginRes.json();
    const token = loginData.token;
    console.log('Got token');

    const headers = { Authorization: `Bearer ${token}` };

    // 2. Upload image
    const form = new FormData();
    fs.writeFileSync('test.jpg', 'fake image content');
    form.append('images', new Blob([fs.readFileSync('test.jpg')]), 'test.jpg');

    let uploadedUrls = [];
    try {
      const uploadRes = await fetch('http://localhost:5000/api/upload/images', {
        method: 'POST',
        headers: headers,
        body: form
      });
      if (!uploadRes.ok) throw new Error(await uploadRes.text());
      uploadedUrls = await uploadRes.json();
      console.log('Upload success:', uploadedUrls);
    } catch (e) {
      console.error('Upload failed:', e.message);
      return;
    }

    // 3. Create jewellery
    const payload = {
      title: '22k platinum bracelet',
      category: '6a1ac313dc9c0fc6fbe57b8a', // Platinum bands id
      description: 'amazing',
      purity: '22K Gold',
      weight: '8',
      tags: ['daily wear'],
      isFeatured: false,
      isActive: true,
      images: [
        { url: uploadedUrls[0].url, publicId: uploadedUrls[0].publicId, isPrimary: true }
      ]
    };

    try {
      const createRes = await fetch('http://localhost:5000/api/jewellery', {
        method: 'POST',
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!createRes.ok) throw new Error(await createRes.text());
      console.log('Create success:', await createRes.json());
    } catch (e) {
      console.error('Create failed:', e.message);
    }

  } catch (error) {
    console.error('Login failed:', error.message);
  }
}

test();
