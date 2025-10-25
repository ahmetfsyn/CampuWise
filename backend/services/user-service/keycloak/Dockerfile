FROM quay.io/keycloak/keycloak:26.4.2

# Çalışma dizini
WORKDIR /opt/keycloak

# Realm dosyasını import klasörüne kopyala
COPY campuwise-realm.json /opt/keycloak/data/import/

ENTRYPOINT ["/opt/keycloak/bin/kc.sh", "start-dev", "--import-realm"]
