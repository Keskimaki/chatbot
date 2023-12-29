FROM docker.io/ubuntu:jammy

ENV TZ="Europe/Helsinki"

WORKDIR /opt/app-root/src

# Setup build tools
RUN apt-get update && apt-get upgrade && \
    apt-get install -y build-essential libopenblas-dev git python3 python3-pip

# Setup Kobold
RUN git clone https://github.com/LostRuins/koboldcpp.git && \
    cd koboldcpp && make LLAMA_OPENBLAS=1

EXPOSE 5001

# Run Mixtral 8x7B
CMD ["python3", "koboldcpp/koboldcpp.py", "models/mixtral-8x7b-instruct-v0.1.Q4_K_M.gguf"]
