import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { 
  Store, 
  Brain, 
  MessageCircle, 
  Smile, 
  Star, 
  TrendingUp, 
  Lightbulb, 
  Smartphone,
  BarChart3,
  Target
} from "lucide-react";

const doodleIcons = [
  { Icon: Store, delay: 0 },
  { Icon: Brain, delay: 0.5 },
  { Icon: MessageCircle, delay: 1 },
  { Icon: Smile, delay: 1.5 },
  { Icon: Star, delay: 2 },
  { Icon: TrendingUp, delay: 2.5 },
  { Icon: Lightbulb, delay: 3 },
  { Icon: Smartphone, delay: 3.5 },
  { Icon: BarChart3, delay: 4 },
  { Icon: Target, delay: 4.5 },
];

export const DoodleBackground = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  
  const getRandomPosition = () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
  });

  const getRandomDuration = () => 20 + Math.random() * 20;

  return (
    <div ref={canvasRef} className="absolute inset-0 overflow-hidden opacity-30 pointer-events-none">
      {doodleIcons.map((item, index) => {
        const { Icon, delay } = item;
        const startPos = getRandomPosition();
        const endPos = getRandomPosition();
        const duration = getRandomDuration();
        
        return (
          <motion.div
            key={index}
            className="absolute"
            initial={{
              left: `${startPos.x}%`,
              top: `${startPos.y}%`,
              opacity: 0,
              scale: 0.5,
            }}
            animate={{
              left: [`${startPos.x}%`, `${endPos.x}%`, `${startPos.x}%`],
              top: [`${startPos.y}%`, `${endPos.y}%`, `${startPos.y}%`],
              opacity: [0, 0.6, 0.4, 0.6, 0],
              scale: [0.5, 1, 0.8, 1, 0.5],
              rotate: [0, 360],
            }}
            transition={{
              duration: duration,
              delay: delay,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <Icon 
              className="w-12 h-12 md:w-16 md:h-16 text-primary/40" 
              strokeWidth={1.5}
            />
          </motion.div>
        );
      })}
      
      {/* Additional floating elements for depth */}
      {Array.from({ length: 25 }).map((_, i) => {
        const startPos = getRandomPosition();
        const endPos = getRandomPosition();
        const size = Math.random() * 6 + 2;
        
        return (
          <motion.div
            key={`particle-${i}`}
            className="absolute rounded-full bg-primary/20"
            style={{
              width: size,
              height: size,
            }}
            initial={{
              left: `${startPos.x}%`,
              top: `${startPos.y}%`,
              opacity: 0,
            }}
            animate={{
              left: [`${startPos.x}%`, `${endPos.x}%`, `${startPos.x}%`],
              top: [`${startPos.y}%`, `${endPos.y}%`, `${startPos.y}%`],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 15 + Math.random() * 15,
              delay: i * 0.3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        );
      })}
    </div>
  );
};
