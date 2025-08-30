import { ContentUploadForm } from '@/components/ContentUploadForm';

export default function UploadPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-center my-8">Upload New Zine</h1>
      <div className="max-w-md mx-auto">
        <ContentUploadForm />
      </div>
    </div>
  );
}
