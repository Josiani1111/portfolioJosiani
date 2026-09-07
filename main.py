from fastapi import FastAPI, Request, Form
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

app = FastAPI(title="Desafio Programador Quick Filler")

app.mount("/static", StaticFiles(directory="static"), name="static")

templates = Jinja2Templates(directory="templates")



@app.get("/")
def home(request: Request):
    return templates.TemplateResponse(
        request=request,
        name="index.html",
        context={}
    )


@app.post("/enviar")
def enviar(
    request: Request,
    nome: str = Form(...),
    email: str = Form(...)
):
    nome = nome.strip()
    email = email.strip()

    if not nome:
        return templates.TemplateResponse(
            request=request,
            name="index.html",
            context={"erro": "O nome é obrigatório"}
        )

    if "@" not in email or "." not in email:
        return templates.TemplateResponse(
            request=request,
            name="index.html",
            context={"erro": "Digite um e-mail válido"}
        )

    return templates.TemplateResponse(
        request=request,
        name="resultado.html",
        context={
            "nome": nome,
            "email": email
        }
    )