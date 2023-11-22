# from langchain.prompts import PromptTemplate
import openai
from App.func import get_gpt_response_content, parse_gpt_response
from ChromaDB.retrieve import similarity_search
from langchain.vectorstores import Chroma
from langchain.embeddings import OpenAIEmbeddings

# Import GPT-4 API key
try:
  API_KEY = open("API_KEY", "r").read()
except FileNotFoundError:
  pass
openai.api_key = API_KEY

persist_directory = "db"

## here we are using OpenAI embeddings but in future we will swap out to local embeddings
embedding = OpenAIEmbeddings(openai_api_key=API_KEY)
vectordb = Chroma(persist_directory=persist_directory, 
                  embedding_function=embedding)

def similarity_search(query, k=2):
  # Now we can load the persisted database from disk, and use it as normal. 

  result = vectordb.similarity_search(query, k)
  return result

# prompt = PromptTemplate(input_variables=["context", "question", "chat_history"] ,template=template)

if __name__ == "__main__":
  while True:
    user_message = input("ASK: ") # Replace with input from website
    if user_message.lower() in ["quit", "exit", "stop", "end", "bye", "goodbye"]:
      break

    else:
      chat_log = []
      context = similarity_search(user_message, k = 2)
      question = user_message

      template = """
          ### Instruction: You're a helpful teacher that recommends a path consisting of at 5 - 7 learning resourses with 
          links and descriptions for learning cybersecurity based on relevancy and difficulty of the course in ascending order. 
          Use only chat history, the following information {context} and if you need, generate an infomative 
          description or paraphrase the existing one. If the information is not relevant you can add from your own knowledge.
          Answer in a constructive manner and don't respond unless it's about cybersecurity. If its not about cybersecurity 
          say that you cant respornd to that, be strict but compassionate.
          Format the response as follows: ** Course name ** \\n ** difficulty ** \\n ** description ** \\n ** [link] **.
          ### Question: {question}
          ### Response:
      """.strip().format(context=context, question=question)

      chat_log.append({"role": "system", "content": template})
      
      assistant_response = get_gpt_response_content(chat_log)
    
      print(parse_gpt_response(assistant_response)) # Replace with output on website
      chat_log.append({"role": "assistant",
                      "content": assistant_response.strip("\n").strip()})
