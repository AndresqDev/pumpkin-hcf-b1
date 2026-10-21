# B1 HCF loadtest harness

Harness público temporal para ejecutar B1 (Pumpkin + Velocity + bots Mineflayer)
en runners de 4 vCPU. **No contiene el código fuente de Pumpkin**; solo los
scripts de carga y el binario release `b1-binary`.

- Binario: `pumpkin-linux-x64-b1` del run `39533557029` de
  `AndresqDev/pumpkin-hcf-ci`.
- SHA-256 del binario: `cc6a2f4e1d46f1a4da6b483694a1b3edd59d4ec09148b633e81b525f744c8fa1`.
- Workflow: `.github/workflows/b1-loadtest.yml` (`hcf=true` / `hcf=false`).
- El secreto `TAILSCALE_AUTHKEY` es necesario para unir los runners.

Este repo se puede borrar o pasar a privado cuando termine la comparación A/B.
