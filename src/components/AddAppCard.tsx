import { AppType } from '../types/app'

export default function AddAppCard({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group p-4 rounded-lg bg-card hover:bg-card-hover hover:shadow-lg transition-all duration-200 border border-dashed border-border w-full h-full"
      style={{ minHeight: 170 }}
    >
      <div className="flex flex-col items-center justify-center gap-3 h-full">
        <div className="w-12 h-12 rounded-xl border border-border flex items-center justify-center text-2xl">＋</div>
        <div className="font-medium">Add New App</div>
        <div className="text-sm text-muted">Create a card with name, link, and icon</div>
      </div>
    </button>
  )
}

