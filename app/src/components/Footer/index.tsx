import { Text, Icon, Link, Flex, Box } from "@chakra-ui/react";
import dayjs from "dayjs";
import { AnimatePresence, motion } from "framer-motion";
import { memo } from "react";
import { AiFillHeart } from "react-icons/ai";
import { createStoreWithComponent, onMounted, onUnmounted, ref } from "reactivity-store";

import { BLOG_SOURCE } from "@app/config/source";

const variants = {
  initial: {
    opacity: 0.2,
    translateY: -14,
  },
  in: {
    opacity: 1,
    translateY: 0,
  },
  out: {
    opacity: 0.2,
    translateY: 14,
  },
};

const Time = createStoreWithComponent({
  setup: () => {
    const time = ref<string>(dayjs().format("YYYY-MM-DD  HH:mm:ss"));

    const isMount = ref(false);

    let id = null;

    onMounted(() => {
      id = setInterval(() => {
        time.value = dayjs().format("YYYY-MM-DD  HH:mm:ss");
      }, 1000);
    });

    onMounted(() => {
      isMount.value = true;
    });

    onUnmounted(() => {
      clearInterval(id);
    });

    return { time, isMount };
  },

  render({ time, isMount }) {
    if (!isMount) {
      return "";
    }
    const dayTime = dayjs(time);
    const year = dayTime.year();
    const month = dayTime.month() + 1 + '';
    const date = dayTime.date() + '';
    const hour = dayTime.hour() + '';
    const minute = dayTime.minute() + '';
    const second = dayTime.second() + '';
    return (
      <Flex
        justifyContent="center"
        sx={{
          ["& > div"]: {
            minWidth: "1.2em",
          },
        }}
      >
        <AnimatePresence exitBeforeEnter>
          <motion.div
            key={year}
            initial="initial"
            animate="in"
            exit="out"
            variants={variants}
            transition={{
              type: "tween",
              duration: 0.12,
            }}
          >
            {year}
          </motion.div>
        </AnimatePresence>
        -
        <AnimatePresence exitBeforeEnter>
          <motion.div
            key={month}
            initial="initial"
            animate="in"
            exit="out"
            variants={variants}
            transition={{
              type: "tween",
              duration: 0.12,
            }}
          >
            {month.length === 1 ? '0' + month : month}
          </motion.div>
        </AnimatePresence>
        -
        <AnimatePresence exitBeforeEnter>
          <motion.div
            key={date}
            initial="initial"
            animate="in"
            exit="out"
            variants={variants}
            transition={{
              type: "tween",
              duration: 0.12,
            }}
          >
            {date.length === 1 ? '0' + date : date}
          </motion.div>
        </AnimatePresence>
        <div> </div>
        <AnimatePresence exitBeforeEnter>
          <motion.div
            key={hour}
            initial="initial"
            animate="in"
            exit="out"
            variants={variants}
            transition={{
              type: "tween",
              duration: 0.12,
            }}
          >
            {hour.length === 1 ? '0' + hour : hour}
          </motion.div>
        </AnimatePresence>
        :
        <AnimatePresence exitBeforeEnter>
          <motion.div
            key={minute}
            initial="initial"
            animate="in"
            exit="out"
            variants={variants}
            transition={{
              type: "tween",
              duration: 0.12,
            }}
          >
            {minute.length === 1 ? '0' + minute : minute}
          </motion.div>
        </AnimatePresence>
        :
        <AnimatePresence exitBeforeEnter>
          <motion.div
            key={second}
            initial="initial"
            animate="in"
            exit="out"
            variants={variants}
            transition={{
              type: "tween",
              duration: 0.12,
            }}
          >
            {second.length === 1 ? '0' + second : second}
          </motion.div>
        </AnimatePresence>
      </Flex>
    );
  },
});

const _Footer = () => {
  return (
    <Box textAlign="center">
      <Flex marginTop="6" justifyContent="center" alignItems="center">
        <Text fontSize={{ base: "medium", md: "xl" }} fontWeight="semibold" noOfLines={1} display="flex" alignItems="center">
          {/* <Text as="span">source from</Text> */}
          <Link href={BLOG_SOURCE} target="_blank" color="blue.500">
            Github
          </Link>

          <Icon as={AiFillHeart} color="red.600" mx="0.2em" />
          <Link href="https://nextjs.org/" target="_blank" color="blue.500">
            Next.js
          </Link>
        </Text>
      </Flex>
      <Text fontSize="small" marginTop="2.5" marginBottom="9" color="lightTextColor">
        <Time />
      </Text>
    </Box>
  );
};

export const Footer = memo(_Footer);
