import { motion } from 'framer-motion';

const LoadingAnimation = () => (
    <motion.div
        className="fixed top-0 left-0 w-full h-full flex items-center justify-center"
        style={{ backgroundColor: '#0933FE' }}
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
    >
        <motion.div
            className="w-20 h-20 border-8 border-white border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
    </motion.div>
);

export default LoadingAnimation;
