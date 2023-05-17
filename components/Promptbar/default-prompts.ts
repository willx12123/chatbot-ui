import { OpenAIModel, OpenAIModelID, OpenAIModels } from '@/types/openai';
import { Prompt } from '@/types/prompt';

const DefaultPromptId = {
  TRANSLATOR: 'd804fdf8-e10f-45c8-9a10-2ec3906cad2d',
  TRAVEL_GUIDE: '264ed64a-f968-4320-a675-51c36f1a8410',
  BACKUPS: [
    'b1400913-69b9-4b8d-8e36-51c1fed4e8de',
    'bc03b874-b689-4b51-891c-e8b13fb00629',
    '269906b3-e694-4015-9369-3ecb7a08b9de',
    '99c15c9e-e825-4816-977f-2b68792392f2',
    '56eb2605-7d05-4a59-8b6e-2234393fb8f1',
    '7d9908c9-0f47-45c0-b764-af5f1bd3548e',
  ],
};

const defaultPrompts = (model: OpenAIModel): Prompt[] => [
  {
    id: DefaultPromptId.TRANSLATOR,
    name: '翻译官',
    description: '使用更高级的用法翻译你的句子为英文',
    content:
      'I want you to act as an English translator, spelling corrector and improver. I will speak to you in any language and you will detect the language, translate it and answer in the corrected and improved version of my text, in English. I want you to replace my simplified A0-level words and sentences with more beautiful and elegant, upper level English words and sentences. Keep the meaning same, but make them more literary. I want you to only reply the correction, the improvements and nothing else, do not write explanations. My first sentence is “{{ 内容 }}”',
    model,
    folderId: null,
  },
  {
    id: DefaultPromptId.TRAVEL_GUIDE,
    name: '导游',
    description: '帮你规划旅行路线，可以问他：“我在北京，我想去故宫游玩”',
    content:
      'I want you to act as a travel guide. I will write you my location and you will suggest a place to visit near my location. In some cases, I will also give you the type of places I will visit. You will also suggest me places of similar type that are close to my first location. My first suggestion request is “{{ 旅行问题 }}”',
    model,
    folderId: null,
  },
];

export function addDefaultPrompts(
  prompts: Prompt[],
  defaultModelId: OpenAIModelID,
): [Prompt[], number] {
  const ret: Prompt[] = [];
  let successAdd = 0;

  const promptIdSet = new Set();
  prompts.forEach((p) => {
    promptIdSet.add(p.id);
    ret.push(p);
  });

  defaultPrompts(OpenAIModels[defaultModelId]).forEach((p) => {
    if (promptIdSet.has(p.id)) {
      return;
    }

    successAdd++;
    ret.push(p);
  });

  return [ret, successAdd];
}

const DEFAULT_PROMPTS_INITIALED = '__prompts_initialed';

export const defaultPromptsInitialed = () =>
  Boolean(localStorage.getItem(DEFAULT_PROMPTS_INITIALED));

export const setDefaultPromptsInitialed = () =>
  localStorage.setItem(DEFAULT_PROMPTS_INITIALED, '1');
