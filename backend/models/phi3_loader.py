from transformers import AutoModelForCausalLM, AutoTokenizer, pipeline
import torch

def load_phi3_pipeline():
    model_id = "microsoft/phi-3-mini-4k-instruct"
    
    tokenizer = AutoTokenizer.from_pretrained(model_id)
    model = AutoModelForCausalLM.from_pretrained(
        model_id,
        torch_dtype=torch.float16,
        device_map="auto"
    )

    pipe = pipeline(
        "text-generation",
        model=model,
        tokenizer=tokenizer,
        max_new_tokens=512,
        temperature=0.2
    )

    return pipe