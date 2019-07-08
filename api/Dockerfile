FROM gcr.io/cloud-builders/csharp/dotnet AS builder

# copy source files
COPY . /src
WORKDIR /src

# restore and build applcation
RUN dotnet restore --packages /packages
RUN dotnet publish -c Release -o /published

FROM gcr.io/google-appengine/aspnetcore:2.0

# copy built files
COPY --from=builder /published /app
WORKDIR /app

# build the app image
ENV ASPNETCORE_URLS=http://*:${PORT}
ENTRYPOINT [ "dotnet", "CandeeCamp.API.dll" ]
