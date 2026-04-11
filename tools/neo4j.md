# Neo4j

## Wat
Grafendatabase voor het opslaan en bevragen van complexe relaties.

## Wanneer gebruiken
Alleen als het project grafrelaties vereist: kennisgrafen, aanbevelingssystemen, sociale netwerken, of complexe hiërarchieën.

**Gebruik Supabase als standaard.** Neo4j alleen als een relationele database de relaties niet goed kan modelleren.

## Kernconcepten
- **Nodes** — entiteiten (personen, producten, concepten)
- **Relationships** — verbindingen tussen nodes met richting en type
- **Properties** — attributen op nodes en relationships
- **Cypher** — querytaal voor Neo4j

## Installatie
```bash
npm install neo4j-driver
```

## Configuratie
```
NEO4J_URI=bolt://localhost:7687
NEO4J_USER=neo4j
NEO4J_PASSWORD=xxx
```

## Links
- [Neo4j Docs](https://neo4j.com/docs/)
- [Cypher Manual](https://neo4j.com/docs/cypher-manual/)
