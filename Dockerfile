FROM python:3.12-slim
RUN useradd -m -u 1000 mkdocs
WORKDIR /site
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
# Default content for running without volumes; overridden by bind mounts in compose
COPY mkdocs.yml .
COPY docs ./docs
COPY overrides ./overrides
USER mkdocs
ENV NO_MKDOCS_2_WARNING=1
EXPOSE 8000
CMD ["mkdocs", "serve", "-a", "0.0.0.0:8000"]
