'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useIPFS } from '@/hooks/useIPFS';

export function ContentUploadForm() {
  const [contentName, setContentName] = useState('');
  const [price, setPrice] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const { uploadFile, isUploading, error } = useIPFS();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      alert('Please select a file to upload.');
      return;
    }
    const cid = await uploadFile(file);
    if (cid) {
      console.log('Upload successful. CID:', cid);
      // Here you would save the metadata (contentName, price, cid) to a database
      console.log('Saving metadata:', { contentName, price, cid });
      alert(`Upload successful! CID: ${cid}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-8">
      <div className="space-y-2">
        <Label htmlFor="contentName">Content Name</Label>
        <Input
          id="contentName"
          value={contentName}
          onChange={(e) => setContentName(e.target.value)}
          placeholder="My Awesome Zine"
          required
          disabled={isUploading}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="price">Price (in ETH)</Label>
        <Input
          id="price"
          type="number"
          step="0.0001"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="0.01"
          required
          disabled={isUploading}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="file">PDF File</Label>
        <Input
          id="file"
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          required
          disabled={isUploading}
        />
      </div>
      <Button type="submit" disabled={isUploading}>
        {isUploading ? 'Uploading...' : 'Upload'}
      </Button>
      {error && <p className="text-red-500">{error.message}</p>}
    </form>
  );
}
