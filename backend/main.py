from langchain.llms import HuggingFacePipeline
from langchain.agents import create_pandas_dataframe_agent
import pandas as pd
from models.phi3_loader import load_phi3_pipeline

# Carrega modelo Phi-3 via transformers
pipeline = load_phi3_pipeline()
llm = HuggingFacePipeline(pipeline=pipeline)

# Carrega dados
df = pd.read_csv("data/exemplo.csv")

# Criar agente
agent = create_pandas_dataframe_agent(llm=llm, df=df, verbose=True)

# User prompt
print(agent.run("Mostre um gráfico de barras com o total de vendas por estado"))
