import { VerbQuestion } from './types';

export const VERB_QUESTIONS: VerbQuestion[] = [
  {
    id: 1,
    sentenceBefore: "The swift cheetah ",
    sentenceAfter: " across the open savanna to catch its dinner.",
    correctVerb: "runs",
    options: ["runs", "running", "run", "has ran"],
    explanation: "Use 'runs' (third-person singular) because the subject 'cheetah' is singular and the sentence describes a general, regular action in the Present Simple tense.",
    tense: "Present Simple",
    difficulty: "Easy",
    contextHint: "Habitual or general action of a single animal"
  },
  {
    id: 2,
    sentenceBefore: "Yesterday, the brave astronaut ",
    sentenceAfter: " on the dusty surface of Mars.",
    correctVerb: "walked",
    options: ["walks", "walked", "will walk", "was walk"],
    explanation: "Use 'walked' because the word 'Yesterday' signals an action that was completed in the past (Past Simple tense).",
    tense: "Past Simple",
    difficulty: "Easy",
    contextHint: "An action completed at a specific time in the past"
  },
  {
    id: 3,
    sentenceBefore: "Tomorrow, our robotic helper ",
    sentenceAfter: " delicious pancakes for breakfast.",
    correctVerb: "will cook",
    options: ["cooks", "cooked", "will cook", "is cooked"],
    explanation: "Use 'will cook' because the word 'Tomorrow' indicates a future prediction or planned action (Future Simple tense).",
    tense: "Future Simple",
    difficulty: "Easy",
    contextHint: "An event scheduled to happen in the future"
  },
  {
    id: 4,
    sentenceBefore: "Look! The tiny puppies ",
    sentenceAfter: " happily in the garden right now.",
    correctVerb: "are playing",
    options: ["is playing", "are playing", "played", "plays"],
    explanation: "Use 'are playing' (Present Continuous) because 'right now' indicates the action is happening at the moment of speaking, and 'puppies' is a plural subject.",
    tense: "Present Continuous",
    difficulty: "Medium",
    contextHint: "Action happening right now with a plural subject"
  },
  {
    id: 5,
    sentenceBefore: "By the time we arrived, the magician ",
    sentenceAfter: " the white rabbit from the hat.",
    correctVerb: "had vanished",
    options: ["has vanished", "had vanished", "vanishes", "will vanish"],
    explanation: "Use 'had vanished' (Past Perfect) to show that one past action (the vanishing) was completed before another past action (our arrival).",
    tense: "Past Perfect",
    difficulty: "Hard",
    contextHint: "An action completed before another point in the past"
  },
  {
    id: 6,
    sentenceBefore: "The clever detective ",
    sentenceAfter: " for clues since early this morning.",
    correctVerb: "has been searching",
    options: ["is searching", "searched", "has been searching", "searches"],
    explanation: "Use 'has been searching' (Present Perfect Continuous) because the action started in the past, continues in the present, and the duration is emphasized ('since early this morning').",
    tense: "Present Perfect Continuous",
    difficulty: "Medium",
    contextHint: "An action starting in the past and continuing up to now"
  },
  {
    id: 7,
    sentenceBefore: "If it rains tomorrow, we ",
    sentenceAfter: " our outdoor soccer tournament.",
    correctVerb: "will cancel",
    options: ["will cancel", "cancelled", "would cancel", "cancels"],
    explanation: "This is a first conditional sentence. We use the Present Simple ('rains') in the if-clause, and 'will' + base verb ('will cancel') in the main clause for a likely future outcome.",
    tense: "First Conditional",
    difficulty: "Medium",
    contextHint: "A real and possible future condition and its result"
  },
  {
    id: 8,
    sentenceBefore: "While the chef was baking the cake, the assistants ",
    sentenceAfter: " the fresh strawberries.",
    correctVerb: "were washing",
    options: ["was washing", "were washing", "are washing", "washed"],
    explanation: "Use 'were washing' (Past Continuous plural) because we are describing a continuous action that was happening at the same time as another past continuous action ('was baking').",
    tense: "Past Continuous",
    difficulty: "Hard",
    contextHint: "Simultaneous, ongoing actions in the past"
  },
  {
    id: 9,
    sentenceBefore: "Neither the teacher nor the students ",
    sentenceAfter: " able to access the school portal.",
    correctVerb: "were",
    options: ["was", "were", "are", "be"],
    explanation: "With 'neither... nor', the verb must agree with the subject closest to it. Here, 'students' is plural, so we use the plural verb 'were' (past tense context).",
    tense: "Subject-Verb Agreement",
    difficulty: "Hard",
    contextHint: "Agreement rule with correlative conjunctions"
  },
  {
    id: 10,
    sentenceBefore: "By next Friday, Sarah ",
    sentenceAfter: " her entire science project.",
    correctVerb: "will have completed",
    options: ["completes", "will complete", "will have completed", "completed"],
    explanation: "Use 'will have completed' (Future Perfect) to describe an action that will be finished or completed before a specific point in the future ('By next Friday').",
    tense: "Future Perfect",
    difficulty: "Hard",
    contextHint: "Action that will be completed before a future time limit"
  }
];

export const ENCOURAGING_PHRASES = [
  "Fantastic!",
  "Spectacular!",
  "You nailed it!",
  "Brilliant!",
  "Outstanding!",
  "Genius!",
  "Awesome work!",
  "Perfect!",
  "Keep it up!",
  "Spot on!"
];

export const WRONG_PHRASES = [
  "Not quite!",
  "Let's try again!",
  "Almost there!",
  "Give it another shot!",
  "Check the tense tip!"
];
