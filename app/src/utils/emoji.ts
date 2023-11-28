import { ReactionContent } from "@blog/graphql";

export const getTargetEmoji = (content: ReactionContent) => {
  switch (content) {
    case ReactionContent.Confused:
      return "😕";
    case ReactionContent.Eyes:
      return "👀";
    case ReactionContent.Heart:
      return "❤️";
    case ReactionContent.Hooray:
      return "🎉";
    case ReactionContent.Laugh:
      return "😄";
    case ReactionContent.Rocket:
      return "🚀";
    case ReactionContent.ThumbsDown:
      return "👎";
    case ReactionContent.ThumbsUp:
      return "👍";
  }
};
