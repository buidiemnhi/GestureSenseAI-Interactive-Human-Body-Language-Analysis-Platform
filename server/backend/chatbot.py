import os
from langchain import LLMChain, PromptTemplate
from langchain.chat_models import ChatOpenAI
from langchain.memory import ConversationBufferWindowMemory, ConversationBufferMemory

basedir = os.path.abspath(os.path.dirname(__file__))
# you need to add the key to your OS environment variable under name "key"
os.environ["OPENAI_API_KEY"] = os.environ.get("key")

file_path = basedir + '\\' + 'template.txt'

with open(file_path, "r") as file:
    content = file.read()

# template = os.read()

prompt = PromptTemplate(
    input_variables=["history", "human_input"],
    template=content
)

chain = LLMChain(
    llm=ChatOpenAI(temperature=0.3, model_name="gpt-3.5-turbo"),
    prompt=prompt,
    memory=ConversationBufferWindowMemory(k=15),
)


def query_2(Question):
    response = chain.predict(human_input=Question)
    return response
