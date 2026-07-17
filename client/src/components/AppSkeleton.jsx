import { motion } from 'framer-motion';

export default function AppSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-8 space-y-4"
    >
      {/* Header Skeleton */}
      <div className="space-y-2 mb-6">
        <motion.div
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="h-8 bg-white/10 rounded-lg w-1/3"
        />
        <motion.div
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="h-4 bg-white/10 rounded-lg w-full"
        />
      </div>

      {/* Content Skeleton */}
      {[1, 2, 3].map((i) => (
        <div key={i} className="space-y-3">
          <motion.div
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="h-4 bg-white/10 rounded-lg w-full"
          />
          <motion.div
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="h-4 bg-white/10 rounded-lg w-5/6"
          />
        </div>
      ))}
    </motion.div>
  );
}
