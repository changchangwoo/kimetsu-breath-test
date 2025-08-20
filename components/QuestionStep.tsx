// QuestionStep.tsx - 개별 질문 컴포넌트
"use client";

import { motion, scale } from "motion/react";

interface QuestionStepProps {
  script: {
    id: number;
    question: string;
    options: {
      id: string;
      text: string;
      weights: { [key: string]: number | undefined };
    }[];
  };
  selectedOption: string | null;
  onSelectOption: (optionId: string) => void;
}

const QuestionStep = ({
  script,
  selectedOption,
  onSelectOption,
}: QuestionStepProps) => {
  const containerVariants = {
    initial: {
      opacity: 0,
      x: 300,
      scale: 0.75,
    },
    animate: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const,
        when: "beforeChildren",
        staggerChildren: 0.08,
      },
    },
    exit: {
      opacity: 0,
      x: -300,
      scale: 0.75,
      transition: {
        duration: 0.2,
        ease: "easeIn" as const,
      },
    },
  };

  const itemVariants = {
    initial: { x: -300, opacity: 0, scale: 0.75 },
    animate: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.3, scale: 0 },
      ease: "easeOut" as const,
    },
    exit: {
      x: -300,
      opacity: 0,
      transition: { duration: 0.2, scale: 0.75 },
      ease: "easeOut" as const,
    },
  };

  return (
    <motion.div
      className="w-screen h-120 flex flex-col items-center justify-center gap-5 p-2"
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      key={script.id}
    >
      <motion.h1
        className="w-max h- text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
      >
        {script.question}
      </motion.h1>

      <motion.div className="w-full h-30 bg-amber-300"></motion.div>

      <motion.ul
        className="w-full h-60 bg-sky-200 p-5 flex flex-col gap-3 rounded-lg shadow-lg"
        variants={{
          animate: {
            transition: {
              staggerChildren: 0.08,
              delayChildren: 0.2,
            },
          },
        }}
      >
        {script.options.map((option) => (
          <motion.li
            variants={itemVariants}
            key={option.id}
            className={`h-10 flex items-center justify-center border rounded-md
              cursor-pointer transition-all hover:scale-105
              ${
                selectedOption === option.id
                  ? "bg-orange-300 border-orange-500 shadow-md"
                  : "bg-amber-50 border-gray-300 hover:bg-amber-100"
              }`}
            onClick={() => onSelectOption(option.id)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {option.text}
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );
};

export default QuestionStep;
