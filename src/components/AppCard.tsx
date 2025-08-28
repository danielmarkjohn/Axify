
import { AppType } from '../types/app'

export default function AppCard({ app, onDetails }: { app: AppType, onDetails: (app: AppType) => void }) {
  return (
    <div 
      className="group p-3 sm:p-4 transition-all duration-300 w-full cursor-pointer hover:scale-105 active:scale-95" 
      onClick={() => window.open(app.link, '_blank')}
    >
      <div className="flex flex-col items-center text-center">
        {/* Large App Icon */}
        <div className="relative mb-2 sm:mb-3">
          <img
            src={app.icon}
            alt={app.name}
            className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-2xl sm:rounded-3xl object-cover shadow-lg group-hover:shadow-2xl transition-all duration-300"
          />
          <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* App Name */}
        <h3 className="font-medium text-xs sm:text-sm md:text-base line-clamp-2 group-hover:text-primary transition-colors duration-200 max-w-full">
          {app.name}
        </h3>
      </div>
    </div>
  )
}
