import OpenAI from 'openai';

let openai: OpenAI | null = null;

function getOpenAIClient(): OpenAI {
  if (!openai) {
    const apiKey = process.env.OPENAI_API_KEY || process.env.OPENROUTER_API_KEY;
    
    // During build time or server-side rendering, we don't need a real API key
    if (!apiKey && (typeof window === 'undefined' || process.env.NODE_ENV === 'production')) {
      openai = new OpenAI({
        apiKey: 'build-time-placeholder',
        baseURL: "https://openrouter.ai/api/v1",
        dangerouslyAllowBrowser: true,
      });
    } else if (!apiKey) {
      // In development, provide a more helpful error message
      console.warn('OpenAI API key not found. Please set OPENAI_API_KEY or OPENROUTER_API_KEY environment variable.');
      openai = new OpenAI({
        apiKey: 'development-placeholder',
        baseURL: "https://openrouter.ai/api/v1",
        dangerouslyAllowBrowser: true,
      });
    } else {
      openai = new OpenAI({
        apiKey,
        baseURL: process.env.OPENROUTER_API_KEY ? "https://openrouter.ai/api/v1" : undefined,
        dangerouslyAllowBrowser: true,
      });
    }
  }
  
  return openai;
}

export async function interpretDream(dreamDescription: string, moodTags: string[] = []): Promise<string> {
  // During build time or server-side rendering, return a placeholder
  if (typeof window === 'undefined' || process.env.NODE_ENV === 'test') {
    return 'Dream interpretation will be available at runtime.';
  }

  // Validate input
  if (!dreamDescription || dreamDescription.trim().length === 0) {
    throw new Error('Dream description is required for interpretation.');
  }

  try {
    const moodContext = moodTags.length > 0 ? `The dreamer's mood was: ${moodTags.join(', ')}.` : '';
    
    const prompt = `As a professional dream analyst, provide a thoughtful interpretation of this dream. Focus on symbolism, potential meanings, and psychological insights. Keep the response engaging but professional.

Dream: "${dreamDescription}"
${moodContext}

Please provide:
1. Key symbols and their potential meanings
2. Emotional themes present
3. Possible psychological significance
4. Overall interpretation

Keep the response concise but insightful (200-300 words).`;

    const completion = await getOpenAIClient().chat.completions.create({
      model: 'google/gemini-2.0-flash-001',
      messages: [
        {
          role: 'system',
          content: 'You are a knowledgeable and empathetic dream analyst who helps people understand their dreams through psychological and symbolic interpretation.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 400,
      temperature: 0.7,
    });

    return completion.choices[0]?.message?.content || 'Unable to interpret dream at this time.';
  } catch (error) {
    console.error('Error interpreting dream:', error);
    return 'Sorry, I encountered an error while interpreting your dream. Please try again later.';
  }
}

export async function analyzePatterns(dreams: any[]): Promise<string> {
  // During build time or server-side rendering, return a placeholder
  if (typeof window === 'undefined' || process.env.NODE_ENV === 'test') {
    return 'Pattern analysis will be available at runtime.';
  }

  // Validate input
  if (!dreams || dreams.length === 0) {
    throw new Error('At least one dream is required for pattern analysis.');
  }

  try {
    const dreamSummaries = dreams.map(d => `"${d.description}" (mood: ${d.moodTags.join(', ')})`).join('\n');
    
    const prompt = `Analyze these dreams for recurring patterns, themes, and symbols. Provide insights about what these patterns might reveal about the dreamer's subconscious mind.

Dreams:
${dreamSummaries}

Please identify:
1. Recurring symbols or themes
2. Emotional patterns
3. Potential psychological insights
4. Suggestions for self-reflection

Keep the analysis insightful and supportive (250-350 words).`;

    const completion = await getOpenAIClient().chat.completions.create({
      model: 'google/gemini-2.0-flash-001',
      messages: [
        {
          role: 'system',
          content: 'You are a skilled pattern analyst who helps people understand recurring themes in their dreams and what they might reveal about their inner life.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 450,
      temperature: 0.6,
    });

    return completion.choices[0]?.message?.content || 'Unable to analyze patterns at this time.';
  } catch (error) {
    console.error('Error analyzing patterns:', error);
    return 'Sorry, I encountered an error while analyzing your dream patterns. Please try again later.';
  }
}
