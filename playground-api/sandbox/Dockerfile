# Stage 1: Build the latest Zen C compiler from source
FROM alpine:3.23 as builder

RUN apk add --no-cache git make gcc clang musl-dev

WORKDIR /zenc-build

# The CACHEBUST argument ensures that we pull fresh code when triggered
ARG CACHEBUST=1

# Clone the latest Zen C compiler
RUN git clone https://github.com/zenc-lang/zenc.git .

# Build the compiler
# Assuming standard 'make' and 'make install' works for Zen C
RUN make clean && make -j$(nproc)
RUN make install


# Stage 2: Create the minimal sandbox container
FROM alpine:3.23

# Zen C needs a C compiler to function since it transpiles to C
RUN apk add --no-cache gcc musl-dev

# Copy the built compiler and standard library from Stage 1
COPY --from=builder /usr/local/bin/zc /usr/local/bin/zc
COPY --from=builder /usr/local/share/zenc /usr/local/share/zenc

# Ensure the binaries belong solidly to root and are immutable to the sandbox user
RUN chown -R root:root /usr/local/bin/zc /usr/local/share/zenc && \
    chmod -R 755 /usr/local/bin/zc /usr/local/share/zenc

# Create a non-privileged user for security isolation
RUN adduser -D -u 1000 sandbox_user

# Environment paths needed by Zen C
ENV ZEN_PATH=/usr/local/share/zenc

# Set the working directory to the mount point used by playground-api
WORKDIR /code
USER sandbox_user

CMD ["/bin/sh"]
