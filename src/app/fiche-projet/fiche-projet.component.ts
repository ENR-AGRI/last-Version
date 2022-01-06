import { ThrowStmt } from "@angular/compiler";

import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  Renderer,
  ViewChild,
} from "@angular/core";
import { NgForm, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import Stepper from "bs-stepper";
import * as moment from "moment";

import { ToastrService } from "ngx-toastr";
import { parse } from "querystring";
import Swal from "sweetalert2";
import { AgriService } from "../services/agri.service";
import { AuthService } from "../services/auth.service";
declare var $: any;
@Component({
  selector: "app-fiche-projet",
  templateUrl: "./fiche-projet.component.html",
  styleUrls: ["./fiche-projet.component.css"],
})
export class FicheProjetComponent implements OnInit {
  @ViewChild("f", { static: false }) form: NgForm;
  @ViewChild("exampleModal", { static: false }) exampleModal: ElementRef;
  @ViewChild("bsStepper", { static: false }) stepperElement!: ElementRef<any>;

  public stepper!: Stepper;

  conceptions;
  constructions;
  clients;
  id;
  infos;
  newFiche: any[] = [];
  infotrie;
  infotrie2;
  infotrie3;
  infotrie4;
  infotrie5;
  res3;
  res4;
  MO_MS;
  Nm3_CH4_t_MO;
  ss;
  prod;
  prod1;
  prod2;
  prod3;
  prod4;
  prod5;

  division;

  eventType = "";
  eventIC2 = "";
  eventIC3 = "";
  formFiche: FormGroup;
  base_prix;
  options: any = [
    { data: "MB", name: "MB" },
    { data: "MS", name: "MS" },
  ];
  prix: any;
  bases;
  t_MB_an;
  t_MS_an;
  somme_MS;
  somme_MB;
  tt_heure_annee;
  debit_horaire_Nm3_CH4_an;
  debit_moyen_annuel;
  Auto_consommation;
  Poste_injection_pertes;
  percent_eff_elevage;

  debit_horaire_injecte_Nm3_CH4_an;
  pvoir_calorfiq_sup_CH4;
  s_tt_KWH_h;
  heure_fonction;
  enrg_KWH_an;
  enrg_MWH_an;
  enrg_GWH_an;
  effluent_elevage;
  Tarif_debut_contrat1;
  Tarif_debut_contrat2;
  Recette_vente_biomethane;
  vente_digestat;
  taux_interet_obligatoire;
  Montant_annuel_redevance;
  CA_annuel_energie;
  fumier;
  fumiers: any = [
    { data: "couverte", value: "couverte" },
    { data: "non couverte", value: "non couverte" },
  ];
  Mois_fumiere;
  mois_Silo;
  Densite_Silo;
  hauteur_Silo;

  Densite_Fumier;

  hauteur_Fumier;
  pluviometre;
  evaporation;
  ventes: any = [
    { data: "oui", value: "oui" },
    { data: "non", value: "non" },
  ];
  // Prix_digestat_Liquide;
  // Prix_digestat_Solide;
  // Quantite_digestat_Liquide;
  // Quantite_digestat_Solise;
  Recette_vente_digestat;
  installation_beneficie_aide_Agence_environnement_maitrise_energie;
  installations: any = [
    { data: "oui", name: "oui" },
    { data: "non", name: "non" },
  ];
  Date_signature_contrat_achat_biomethane;
  tarif_debut_contrat;
  Financement_Fonds_Propres;
  financements: any = [
    { data: "oui", value: "oui" },
    { data: "non", value: "non" },
  ];

  Pourcentage_FP_Financer;

  Montant_finance_FP_Finance;
  Montant_pret_bancaire;
  ERIBOR;
  Taux_interet_annuel;
  selected: Date;
  infofilter;
  Description;
  f13;
  F14;
  f11;
  f15;
  f16;
  sum1;
  sum2;
  sum3;
  //Feuille Capex
  Audit_assurantiel;
  Audit_juridique;
  Audit_Technique;
  Audit_Fiscal;
  Convention_credit;
  Suivi_chantier;

  BFR = 0;

  //Feuille Digestat
  total_type_intrant;
  total_digestat;
  total_quantite_vegetal;
  total_terrain;
  terrain_Autre;
  Digestat_Liquide_Requis;
  Digestat_Solide_Requis;
  total_Epandage;
  digistat_liquide_exedent;
  digistat_solide_exedent;
  total_quantite_total;
  percent_rapport_NPK;
  total_percent;
  total_N;
  avec_Subvention;
  total_P;
  total_K;
  Digestat_Brut_quantite;
  Digestat_Brut_percent;
  Digestat_Brut_N;
  Digestat_Brut_P;
  Digestat_Brut_K;
  Digestat_LIQUIDE_quantite;
  Digestat_LIQUIDE_percent;
  Digestat_LIQUIDE_N;
  Digestat_LIQUIDE_P;
  Digestat_LIQUIDE_K;
  Digestat_SOLIDE_quantite;
  Digestat_SOLIDE_percent;
  Digestat_SOLIDE_N;
  Digestat_SOLIDE_P;
  Digestat_SOLIDE_K;
  InputValue;
  InputValue_liquide;
  InputValue_solide;

  //------------
  tas_ensilage_Fumier;
  tas_ensilage_Silo;
  recup_eaux_uses_Fumier;
  recup_eaux_uses_Silo;
  total_eaux_uses = 0;

  culture;
  autres;
  voie_unite;
  digistat_brut;
  digistat_liquide;
  digistat_solide;
  Terrain_culture_dedie;
  autre_terrain;
  Quantite_fraction_liquide;
  Quantite_fraction_solide;
  digistat_liquide_requis;
  digistat_solide_requis;

  isVisible: boolean = false;
  //capexScenario
  Mtn_Total_Concep_Contruc_inj;
  Mtn_Total_Concep_Contruc_cog;
  cout_racc_cog;
  cout_racc_inj;
  rep_Financement_bq;
  rep_Financement_Fp;
  rep_Financement_bq_cog;
  rep_Financement_Fp_cog;
  part_financier_percent = 0;
  part_financier_Montant = 0;
  montant_total;
  montant_total_cog;

  Constructions;
  exploitations;
  c;
  D;

  //PERCENT DEGISTAT
  perDegestat: any[];
  totPercentDegest;
  Tarif_debut_contrat_euro;
  CA_Annuel_Injection;
  Vente_digestat;
  Prix_digestat_Liquide;
  Prix_digestat_Solide;
  Quantite_digestat_Liquide;
  Quantite_digestat_Solide;
  CA_Annuel_Digestat;
  //Feuille BP INJECTION

  total_invest = 0;
  open = false;
  grdf;

  opexF72;
  opexF65;
  opexF47;
  opexF21;
  bfr_consommable;

  Convention_de_credit_dette_syndiquee;
  Suivi_de_chantier;
  In_Front_Oblig;
  FINANCEMENTS;
  FONDS_PROPRES;
  SUBVENTION;
  CAPITAL_APPORT_COMPTE_COURANt;
  EMPRUNT_CAPITAL;
  LOCATION_VENTE_CONSTRUCTEUR;
  EMPRUNT_LONG_ERME;
  TOTAL_FINANCEMENTS = 0;
  BFR_Frais_Financier;
  Hypotheque;
  percent_subvention;
  percent_fondPropre;
  Total_autres;
  percent_capital_apport;
  percent_emprunt_capital;
  percent_location;
  percent_emprunt_long_terme;
  taux_emprunt_capital;
  taux_emprunt_long_terme;
  currentDate = new Date();
  Nmbre_h_par_mois;
  Hausse_salaire;
  TAUX_CHARGES_PATRONALES;
  Montee_charge_n0;
  Production_annuelle_biomethane_n0;
  Inflation_tarif_GRDF_n0;
  Indice_n0;
  Tarif_biomethane_n0;
  Montee_charge_n1;
  Production_annuelle_biomethane_n1;
  Inflation_tarif_GRDF_n1;
  Indice_n1;
  Tarif_biomethane_n1;
  Montee_charge_n2;
  Production_annuelle_biomethane_n2;
  Inflation_tarif_GRDF_n2;
  Indice_n2;
  Tarif_biomethane_n2;

  Montee_charge_n3;
  Production_annuelle_biomethane_n3;
  Inflation_tarif_GRDF_n3;
  Indice_n3;
  Tarif_biomethane_n3;
  Montee_charge_n4;
  Production_annuelle_biomethane_n4;
  Inflation_tarif_GRDF_n4;
  Indice_n4;
  Tarif_biomethane_n4;
  Montee_charge_n5;
  Production_annuelle_biomethane_n5;
  Inflation_tarif_GRDF_n5;
  Indice_n5;
  Tarif_biomethane_n5;
  Montee_charge_n6;
  Production_annuelle_biomethane_n6;
  Inflation_tarif_GRDF_n6;
  Indice_n6;
  Tarif_biomethane_n6;
  Montee_charge_n7;
  Production_annuelle_biomethane_n7;
  Inflation_tarif_GRDF_n7;
  Indice_n7;
  Tarif_biomethane_n7;
  Montee_charge_n8;
  Production_annuelle_biomethane_n8;
  Inflation_tarif_GRDF_n8;
  Indice_n8;
  Tarif_biomethane_n8;
  Montee_charge_n9;
  Production_annuelle_biomethane_n9;
  Inflation_tarif_GRDF_n9;
  Indice_n9;
  Tarif_biomethane_n9;
  Montee_charge_n10;
  Production_annuelle_biomethane_n10;
  Inflation_tarif_GRDF_n10;
  Indice_n10;
  Tarif_biomethane_n10;
  Montee_charge_n11;
  Production_annuelle_biomethane_n11;
  Inflation_tarif_GRDF_n11;
  Indice_n11;
  Tarif_biomethane_n11;
  Montee_charge_n12;
  Production_annuelle_biomethane_n12;
  Inflation_tarif_GRDF_n12;
  Indice_n12;
  Tarif_biomethane_n12;
  Montee_charge_n13;
  Production_annuelle_biomethane_n13;
  Inflation_tarif_GRDF_n13;
  Indice_n13;
  Tarif_biomethane_n13;
  Montee_charge_n14;
  Production_annuelle_biomethane_n14;
  Inflation_tarif_GRDF_n14;
  Indice_n14;
  Tarif_biomethane_n14;
  Montee_charge_n15;
  Production_annuelle_biomethane_n15;
  Inflation_tarif_GRDF_n15;
  Indice_n15;
  Tarif_biomethane_n15;

  Vente_Biomethane_n1;
  Redevance_traitement_dechets_n1;
  Vente_digestat_solide_n1;
  Vente_digestat_liquide_n1;
  Vente_Biomethane_n2;
  Redevance_traitement_dechets_n2;
  Vente_digestat_solide_n2;
  Vente_digestat_liquide_n2;
  Vente_Biomethane_n3;
  Redevance_traitement_dechets_n3;
  Vente_digestat_solide_n3;
  Vente_digestat_liquide_n3;
  Vente_Biomethane_n4;
  Redevance_traitement_dechets_n4;
  Vente_digestat_solide_n4;
  Vente_digestat_liquide_n4;
  Vente_Biomethane_n5;
  Redevance_traitement_dechets_n5;
  Vente_digestat_solide_n5;
  Vente_digestat_liquide_n5;
  Vente_Biomethane_n6;
  Redevance_traitement_dechets_n6;
  Vente_digestat_solide_n6;
  Vente_digestat_liquide_n6;
  Vente_Biomethane_n7;
  Redevance_traitement_dechets_n7;
  Vente_digestat_solide_n7;
  Vente_digestat_liquide_n7;
  Vente_Biomethane_n8;
  Redevance_traitement_dechets_n8;
  Vente_digestat_solide_n8;
  Vente_digestat_liquide_n8;
  Vente_Biomethane_n9;
  Redevance_traitement_dechets_n9;
  Vente_digestat_solide_n9;
  Vente_digestat_liquide_n9;
  Vente_Biomethane_n10;
  Redevance_traitement_dechets_n10;
  Vente_digestat_solide_n10;
  Vente_digestat_liquide_n10;
  Vente_Biomethane_n11;
  Redevance_traitement_dechets_n11;
  Vente_digestat_solide_n11;
  Vente_digestat_liquide_n11;
  Vente_Biomethane_n12;
  Redevance_traitement_dechets_n12;
  Vente_digestat_solide_n12;
  Vente_digestat_liquide_n12;
  Vente_Biomethane_n13;
  Redevance_traitement_dechets_n13;
  Vente_digestat_solide_n13;
  Vente_digestat_liquide_n13;
  Vente_Biomethane_n14;
  Redevance_traitement_dechets_n14;
  Vente_digestat_solide_n14;
  Vente_digestat_liquide_n14;
  Vente_Biomethane_n15;
  Redevance_traitement_dechets_n15;
  Vente_digestat_solide_n15;
  Vente_digestat_liquide_n15;
  Redevance_traitement_dechets;

  //
  isNanFunction(val) {
    return isNaN(val) ? 0 : parseFloat(val);
  }
  //**
  @Output() scenarioEmetteur = new EventEmitter<string>();
  formClient: FormGroup;
  show = true;

  roles;

  current_User;
  constructor(
    private agriSrv: AgriService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private authSrv: AuthService
  ) {}
  // @ViewChild("i", { static: false }) vall: ElementRef;

  @ViewChild("someVar", { static: false }) el: ElementRef;

  ngAfterViewInit() {
    this.el.nativeElement.focus();
  }
  userCreatedAt;
  ngOnInit() {
    this.authSrv.profile().subscribe((data: any) => {
      this.current_User = data;
      this.userCreatedAt = this.current_User.createdOn;
    });

    this.formClient = this.fb.group({
      prenom: [
        "",
        [
          Validators.minLength(3),
          Validators.maxLength(50),
          Validators.required,
        ],
      ],
      nom: [
        "",
        [
          Validators.minLength(3),
          Validators.maxLength(50),
          Validators.required,
        ],
      ],

      email: ["", [Validators.email, Validators.required]],

      tel: ["", [Validators.required]],
      tel_Domicile: "",
      fonction: ["", [Validators.required]],
      adresse: ["", Validators.required],
      codePostal: ["", Validators.required],
      ville: ["", Validators.required],
      pays: ["France", Validators.required],
      complement: "",
      societe: "",
      nom_societe: "",
    });

    this.currentStep = Steps.STEP_1;
    this.getDataConstruction();
    this.getData();
    this.getDataExploitation();
    this.cout_racc_inj = 300000;
    this.cout_racc_cog = 60000;
    this.tt_heure_annee = "8760";
    this.pvoir_calorfiq_sup_CH4 = "10.80";
    this.heure_fonction = "8200";
    this.Tarif_debut_contrat1 = "9.63";
    this.vente_digestat = "";
    this.tarif_debut_contrat = "9.47";
    this.taux_interet_obligatoire = "8%";
    this.ERIBOR = 0;
    this.Montant_annuel_redevance = "0.0£";
    this.Mois_fumiere = 1.5;
    this.mois_Silo = 18;
    this.Densite_Silo = 0.7;
    this.hauteur_Silo = 6.0;
    this.pluviometre = 900;
    this.evaporation = "40";
    this.Densite_Fumier = 0.5;
    this.Prix_digestat_Solide = 6;
    this.Prix_digestat_Liquide = 3.5;
    this.Prix_digestat_Solide = 6;

    this.hauteur_Fumier = 1.5;
    this.hauteur_Silo = 6;
    this.f11 = 0;
    this.f15 = 0;
    this.autre_terrain = 0;
    this.Quantite_fraction_liquide = 30;
    this.Quantite_fraction_solide = 12;
    this.grdf = 300000;

    //BPINJECTION
    this.Hypotheque = 55800;
    this.Audit_assurantiel = 3000;
    this.Audit_juridique = 12000;
    this.Audit_Technique = 6000;
    this.Audit_Fiscal = 2500;
    this.Convention_de_credit_dette_syndiquee = 30000;
    this.Suivi_de_chantier = 42000;
    this.In_Front_Oblig = 0;

    this.percent_fondPropre = "25%";
    this.percent_subvention = "10%";
    this.taux_emprunt_capital = "8%";
    this.taux_emprunt_long_terme = "2.15%";
    this.Hausse_salaire = "1%";
    this.TAUX_CHARGES_PATRONALES = "35%";
    this.Indice_n0 = "100%";
    this.Montee_charge_n1 = "75%";
    this.Montee_charge_n2 = "100%";
    this.Montee_charge_n3 = "100%";
    this.Montee_charge_n4 = "100%";
    this.Montee_charge_n5 = "100%";
    this.Montee_charge_n6 = "100%";
    this.Montee_charge_n7 = "100%";
    this.Montee_charge_n8 = "100%";
    this.Montee_charge_n9 = "100%";
    this.Montee_charge_n10 = "100%";
    this.Montee_charge_n11 = "100%";
    this.Montee_charge_n12 = "100%";
    this.Montee_charge_n13 = "100%";
    this.Montee_charge_n14 = "100%";
    this.Montee_charge_n15 = "100%";

    this.Inflation_tarif_GRDF_n1 = "0%";
    this.Inflation_tarif_GRDF_n2 = 0.01;
    this.Inflation_tarif_GRDF_n3 = 0.01;
    this.Inflation_tarif_GRDF_n4 = 0.01;
    this.Inflation_tarif_GRDF_n5 = 0.01;
    this.Inflation_tarif_GRDF_n6 = 0.01;
    this.Inflation_tarif_GRDF_n7 = 0.01;
    this.Inflation_tarif_GRDF_n8 = 0.01;
    this.Inflation_tarif_GRDF_n9 = 0.01;
    this.Inflation_tarif_GRDF_n10 = 0.01;
    this.Inflation_tarif_GRDF_n11 = 0.01;
    this.Inflation_tarif_GRDF_n12 = 0.01;
    this.Inflation_tarif_GRDF_n13 = 0.01;
    this.Inflation_tarif_GRDF_n14 = 0.01;
    this.Inflation_tarif_GRDF_n15 = 0.01;

    this.Indice_n0 = 1;
    this.Indice_n1 = 1;
    this.Redevance_traitement_dechets = 0;

    this.LOCATION_VENTE_CONSTRUCTEUR = 0;

    this.id = this.route.snapshot.params["id"];

    this.agriSrv.getClientById(this.id).subscribe((data) => {
      this.clients = data;
      console.log("client", this.clients);
    });
    this.getFichesInfo();

    this.Indice_n2 = this.produit2(
      this.Inflation_tarif_GRDF_n2 + 1,
      this.Indice_n1
    );
    this.Indice_n3 = this.produit2(
      this.Inflation_tarif_GRDF_n3 + 1,
      this.Indice_n2
    );
    this.Indice_n4 = this.produit2(
      this.Inflation_tarif_GRDF_n4 + 1,
      this.Indice_n3
    );
    this.Indice_n5 = this.produit2(
      this.Inflation_tarif_GRDF_n5 + 1,
      this.Indice_n4
    );
    this.Indice_n6 = this.produit2(
      this.Inflation_tarif_GRDF_n6 + 1,
      this.Indice_n5
    );
    this.Indice_n7 = this.produit2(
      this.Inflation_tarif_GRDF_n7 + 1,
      this.Indice_n6
    );
    this.Indice_n8 = this.produit2(
      this.Inflation_tarif_GRDF_n8 + 1,
      this.Indice_n7
    );
    this.Indice_n9 = this.produit2(
      this.Inflation_tarif_GRDF_n9 + 1,
      this.Indice_n8
    );
    this.Indice_n10 = this.produit2(
      this.Inflation_tarif_GRDF_n10 + 1,
      this.Indice_n9
    );
    this.Indice_n11 = this.produit2(
      this.Inflation_tarif_GRDF_n11 + 1,
      this.Indice_n10
    );
    this.Indice_n12 = this.produit2(
      this.Inflation_tarif_GRDF_n12 + 1,
      this.Indice_n11
    );
    this.Indice_n13 = this.produit2(
      this.Inflation_tarif_GRDF_n13 + 1,
      this.Indice_n12
    );
    this.Indice_n14 = this.produit2(
      this.Inflation_tarif_GRDF_n14 + 1,
      this.Indice_n13
    );
    this.Indice_n15 = this.produit2(
      this.Inflation_tarif_GRDF_n15 + 1,
      this.Indice_n14
    );

    // this.Indice_n3=this.produit2(())
  }

  borderVille = false;
  borderFonction = false;
  borderSociete = false;
  borderCodePostal = false;
  borderTel_Domicile = false;
  borderNomSociete = false;

  signUpClient() {
    let form = this.formClient.value;
    console.log("form", form);
    if (this.current_User.fonction == "") {
      this.borderFonction = true;
    }
    if (this.current_User.societe == "") {
      this.borderSociete = true;
    }
    if (this.current_User.nom_societe == "") {
      this.borderVille = true;
    }
    if (this.current_User.ville == "") {
      this.borderVille = true;
    }
    if (this.current_User.codePostal == "") {
      this.borderCodePostal = true;
    }
    if (this.current_User.tel_Domicile == "") {
      this.borderTel_Domicile = true;
    }
    if (this.current_User.nom_societe == "") {
      this.borderNomSociete = true;
    }
    form.nom = this.current_User.nom;
    form.prenom = this.current_User.prenom;
    form.email = this.current_User.email;
    form.tel = this.current_User.tel;
    form.fonction = this.formClient.value.fonction;
    form.societe = this.formClient.value.societe;
    form.nom_societe = this.formClient.value.nom_societe;
    form.ville = this.formClient.value.ville;
    form.codePostal = this.formClient.value.codePostal;
    form.tel_Domicile = this.formClient.value.tel_Domicile;
    form.role = this.current_User.role;
    form.user_id = this.current_User._id;

    console.log("form", form);
    this.authSrv.updateProfile(form).subscribe(
      (data: any) => {
        // if (data) this.toastr.success(data.msgsrv);
        // console.log("data error", data.msgsrv);
        // this.formClient.reset();
      }
      // (err:any) => {
      //   let msg = "verifier les champs saisie";
      //   // this.toastr.warning(err.error.msgsrv);
      //   this.toastr.warning(msg);
      // }
    );
  }

  getAllRoles() {
    this.authSrv.getAllRole().subscribe((data: any) => {
      this.roles = data;

      console.log("roles", this.roles);
    });
  }

  get fnNom() {
    return this.formClient.get("nom");
  }
  get fnPrenom() {
    return this.formClient.get("prenom");
  }

  get fnEmail() {
    return this.formClient.get("email");
  }
  get fnTel() {
    return this.formClient.get("tel");
  }

  get fnFonction() {
    return this.formClient.get("fonction");
  }

  get fnCodePostal() {
    return this.formClient.get("codePostal");
  }

  get fnVille() {
    return this.formClient.get("ville");
  }

  get fnPays() {
    return this.formClient.get("pays");
  }
  toggleshow() {
    this.show = !this.show;
  }

  listenEtat(value: any) {
    console.log("event.target.value : ", value);
    let d = Date.now();
    let date = moment(d).format("lll");
    enum DateTypes {
      Date_StatQ = "Client En Quotation",
      Date_StatCC = "Contrat Cadre",
      Date_StatCp = "Client En Conception",

      Date_StatCs = "Client En Construction",
      Date_StatEs = "Client En service",
    }

    //this.formClient.reset();
    this.formClient.get("Date_StatQ").setValue("");
    this.formClient.get("Date_StatEs").setValue("");
    this.formClient.get("Date_StatCp").setValue("");
    this.formClient.get("Date_StatCs").setValue("");
    this.formClient.get("Date_StatCC").setValue("");
    const formControlName = Object.keys(DateTypes).find(
      (key) => DateTypes[key] === value
    );
    this.formClient.get(formControlName).setValue(date);
  }

  setvalue(value) {
    this.InputValue = value.replace("%", "") + "%";
  }
  setvalue_liquide(value) {
    this.InputValue_liquide = value.replace("%", "") + "%";
  }
  setvalue_solide(value) {
    this.InputValue_solide = value.replace("%", "") + "%";
  }

  setvalue_fondPropre(value) {
    this.percent_fondPropre = value.replace("%", "") + "%";
  }
  setvalue_subvention(value) {
    this.percent_subvention = value.replace("%", "") + "%";
  }
  getDataExploitation() {
    this.agriSrv.getDataExploitation().subscribe((data) => {
      this.exploitations = data;
      console.log("exloiData", data);
    });
  }

  listenBase(event) {
    console.log("eveeeeeeeeeeeeent", event);
    this.bases = this.base_prix.find((x) => x.data == event);
    console.log("bases1", this.bases);
  }
  dashboarcard = [{ titel: "", percent: 0 }];
  nzStrokeColorVal: string = "red";
  listenType(event) {
    console.log("eveeeeeeeeeeeeent", event);
    this.dashboarcard = [{ titel: `${event}`, percent: 25 }];
    this.eventType = event;

    this.infotrie2 = this.infos
      .filter((x) => x.IC1 == event)
      .map((item) => item.IC2)
      .filter((value, index, self) => self.indexOf(value) === index);
  }
  listenIc1(event) {
    this.eventIC2 = event;
    this.dashboarcard = [{ titel: `${event}`, percent: 50 }];

    this.infotrie3 = this.infos
      .filter((x) => x.IC2 == event)
      .map((item) => item.IC3)
      .filter((value, index, self) => self.indexOf(value) === index);
  }
  listenIc2(event) {
    this.dashboarcard = [{ titel: `${event}`, percent: 75 }];

    this.eventIC3 = event;
    this.infotrie4 = this.infos
      .filter((x) => x.IC3 == event)
      .map((item) => item.Description)
      .filter((value, index, self) => self.indexOf(value) === index);
  }
  desc;
  listenDesc(event) {
    setTimeout(() => {
      this.dashboarcard = undefined;
    }, 500);
    this.dashboarcard = [{ titel: `${event}`, percent: 100 }];
    this.desc = event;

    this.infotrie5 = this.infos.find((x) => x.Description == event);
    console.log("nnn", this.infotrie5);
    console.log("eve", event);

    (this.infofilter = this.infotrie5.map((item) => {
      return item.MS;
    })),
      console.log("info", this.infos);
    console.log("this.infooooo", this.infofilter);
    //delete this.fiche.descrptin_id
  }

  CalculSUMMS(y) {
    this.somme_MS = y
      .map((x) => {
        return x.t_MS_an;
      })
      .reduce((accumulator, current) => {
        return accumulator + parseFloat(current);
      }, 0);
    return this.somme_MS;
  }
  quantiteListen;
  listenQuantute(event) {
    console.log("305", event);
    this.quantiteListen = event;
    this.infotrie5 = this.infos.find((x) => x.Description == this.desc);
    console.log("ingo5", this.infotrie5);

    //somme MS
    console.log("***", this.newFiche);

    this.somme_MS = this.CalculSUMMS(this.newFiche);

    this.prod = this.produit(
      parseFloat(this.infotrie5.uMB_an.replace(",", ".")),
      +parseFloat(event),
      +this.infotrie5.Taux_de_Presence_Rendement_par_ha.replace("%", "") / 100
    );
    console.log("ppp", this.prod);

    this.t_MB_an = this.prod.toFixed(2);

    this.prod1 = this.produit2(
      +this.prod,
      +this.infotrie5.MS.replace(",", ".").replace("%", "") / 100
    );

    this.t_MS_an = this.prod1.toFixed(2);

    this.prod2 = this.produit3(
      +this.infotrie5.Nm3_CH4_t_MO,
      +this.infotrie5.MO_MS.replace(",", ".").replace("%", "") / 100,
      +this.infotrie5.MS.replace(",", ".").replace("%", "") / 100,
      +this.prod
    );
    this.Nm3_CH4_an = this.quotion(this.prod2, 8760).toFixed(2);

    this.KWe_h = this.produit(+this.prod2, 10.8, 0.4);
    console.log("kwh", this.KWe_h);

    this.KWe_h = this.KWe_h;
  }

  getFichesInfo() {
    this.agriSrv.getfichesInfo().subscribe((data: any) => {
      this.infos = data;
      console.log("info", this.infos);

      this.infotrie = this.infos
        .map((item) => item.IC1)
        .filter((value, index, self) => self.indexOf(value) === index);
    });
  }

  uMB_an;
  Taux_de_Presence_Rendement_par_ha;
  quantite;
  description;

  sum_of_Animal_TMB = 0;
  sum_of_vegTable_TMB = 0;
  sum_of_Autre_TMB = 0;
  TOTAL_TMB = 0;

  sum_of_Animal_TMS = 0;
  sum_of_vegTable_TMS = 0;
  sum_of_Autre_TMS = 0;
  TOTAL_TMS = 0;
  //
  sum_of_Animal_NM3 = 0;
  sum_of_vegTable_NM3 = 0;
  sum_of_Autre_NM3 = 0;
  TOTAL_NM3 = 0;
  MS;
  volume_Nm3_CH4_an;
  Nm3_CH4_an;
  KWe_h;
  somme_KWH;
  Effluent_Delevage;
  res2;
  val;
  valuesaveContent;
  N;
  P;
  K;
  resetForm() {
    this.form.reset();
  }

  formValue;
  arrayForm = [];
  IC1;
  saveContent(value) {
    console.log("edit mod 2 ..POSITION", this.editMode, this.position);
    console.log("val val saveContent", value);

    let v = value;
    this.valuesaveContent = value;
    console.log("valuesaveContent", this.valuesaveContent);

    v.IC1 = this.eventType;
    v.IC2 = this.eventIC2;
    v.IC3 = this.eventIC3;
    v.Description = this.desc;

    console.log("IC1*****************", v.IC1);

    v.unite = this.infotrie5.unite;
    this.Effluent_Delevage = v.Effluent_Delevage =
      this.infotrie5.Effluent_Delevage;
    this.Taux_de_Presence_Rendement_par_ha =
      v.Taux_de_Presence_Rendement_par_ha =
        this.infotrie5.Taux_de_Presence_Rendement_par_ha;
    this.uMB_an = v.uMB_an = this.infotrie5.uMB_an;
    v.Unitee = this.infotrie5.Unitee;
    v.Type = this.infotrie5.Type;

    this.MS = v.MS = this.infotrie5.MS;

    console.log("aaaa", this.infofilter);
    // this.t_MB = v.t_MB;
    // this.t_MS = v.t_MS;

    this.MO_MS = v.MO_MS = this.infotrie5.MO_MS;
    this.quantite = v.quantite;
    this.InputValue = v.InputValue;

    this.description = v.description;
    v.Nm3_CH4_t_MO = this.infotrie5.Nm3_CH4_t_MO;
    v.CH4percentMS = this.infotrie5.CH4percentMS;
    v.u_P2O5_t = this.infotrie5.u_P2O5_t;
    v.u_K2O_t = this.infotrie5.u_K2O_t;
    v.u_N_t = this.infotrie5.u_N_t;

    v.Commentaire = this.infotrie5.Commentaire;

    this.base_prix = v.base_prix;
    console.log("basePris", v.base_prix);

    //  this.infotrie3=this.listenIc2(this.infotrie2)
    //  this.infotrie5=this.listenDesc(this.infotrie3)

    this.prod = this.produit(
      +v.uMB_an.replace(",", "."),
      +v.quantite,
      +v.Taux_de_Presence_Rendement_par_ha.replace("%", "") / 100
    );

    //  v.Commentaire=this.prod
    this.t_MB_an = this.prod.toFixed(2);
    console.log("tmb", v.t_MB_an);

    this.prod1 = this.produit2(
      +v.t_MB_an,
      +v.MS.replace(",", ".").replace("%", "") / 100
    );

    this.t_MS_an = v.t_MS_an = this.prod1.toFixed(2);
    // console.log("Prod1", this.prod1);
    this.prod2 = this.produit3(
      +v.Nm3_CH4_t_MO,
      +v.MO_MS.replace(",", ".").replace("%", "") / 100,
      +v.MS.replace(",", ".").replace("%", "") / 100,
      +v.t_MB_an
    );
    this.Nm3_CH4_an = this.quotion(this.prod2, 8760).toFixed(2);

    this.Nm3_CH4_an = v.Nm3_CH4_an = this.prod2.toFixed(2);

    this.KWe_h = this.produit(+v.Nm3_CH4_an, 10.8, 0.4);
    console.log("kkkkkkkkkk", this.KWe_h);

    this.KWe_h = v.KWe_h = this.KWe_h.toFixed(2);
    // console.log("Prod2", this.prod2);
    this.prod3 = this.produit2(+v.t_MB_an, +v.u_N_t.replace(",", "."));
    v.N = this.N = this.prod3.toFixed(2);
    //P
    this.prod4 = this.produit2(+v.t_MB_an, +v.u_P2O5_t.replace(",", "."));

    v.P = this.P = this.prod4.toFixed(2);
    //K
    this.prod5 = this.produit2(+v.t_MB_an, +v.u_K2O_t.replace(",", "."));

    v.K = this.K = this.prod5.toFixed(2);
    console.log("v", v);

    v.Nm3_CH4_an = this.Nm3_CH4_an = this.quotion(this.prod2, 8760).toFixed(2);

    console.log("yarab", v.Nm3_CH4_an);

    this.volume_Nm3_CH4_an = this.newFiche
      .filter((x) => x.Nm3_CH4_an)
      .reduce(
        (accumulator, current) => accumulator + parseFloat(current.Nm3_CH4_an),
        0
      );

    console.log("voluùe", this.volume_Nm3_CH4_an);
    //somme kwh
    console.log("kwh*****", this.newFiche);

    this.somme_KWH = this.newFiche
      .filter((x) => x.KWe_h)
      .reduce(
        (accumulator, current) => accumulator + parseFloat(current.KWe_h),
        0
      );

    console.log("som_KWH", this.somme_KWH);
    //somme MS
    this.somme_MS = this.newFiche
      .filter((x) => x.t_MS_an)
      .reduce(
        (accumulator, current) => accumulator + parseFloat(current.t_MS_an),
        0
      );

    console.log("somme_MB", this.somme_MS);
    //Somme MB
    this.somme_MB = this.newFiche
      .filter((x) => x.t_MB_an)
      .reduce(
        (accumulator, current) => accumulator + parseFloat(current.t_MB_an),
        0
      );

    console.log("somme_MB", this.somme_MB);

    //////////////////////////////////la place de debit horaire ancien

    this.scenarioEmetteur.emit(this.debit_horaire_injecte_Nm3_CH4_an);
    console.log("debit555", this.debit_horaire_injecte_Nm3_CH4_an);
    this.Taux_interet_annuel = this.ERIBOR + 0.0215;
    console.log("Taux_interet_annuel", this.Taux_interet_annuel);

    ///////////////////////////////////////////////////////////////////////////////////////////

    // var res = this.sum_of_Animal_TMB.toFixed(2);
    console.log("sum", this.sum_of_Animal_TMB);
    // //bloc Digestat Calcul
    // let p = this.produit2(12, this.Mois_fumiere);
    // if (this.Densite_Fumier != 0 && p != 0 && this.hauteur_Fumier != 0) {
    //   let q = this.quotion(this.sum_of_Animal_TMB, this.Densite_Fumier);

    //   let q1 = this.quotion(q, p);
    //   this.tas_ensilage_Fumier = this.quotion(q1, this.hauteur_Fumier).toFixed(
    //     2
    //   );
    // }
    // //Calcul de tas_ensilage_Silo
    // let x1 = this.produit2(12, this.mois_Silo);
    // if (this.Densite_Silo != 0 && x1 != 0 && this.hauteur_Silo != 0) {
    //   let q = this.quotion(this.sum_of_Animal_TMB, this.Densite_Silo);

    //   let q1 = this.quotion(q, x1);
    //   this.tas_ensilage_Silo = this.quotion(q1, this.hauteur_Silo).toFixed(2);
    // }
    // //Calcul de recup_eaux_uses_Fumier
    // let p2 = this.produit2(
    //   parseFloat(this.tas_ensilage_Fumier),
    //   parseFloat(this.pluviometre)
    // );

    // let p3 = 1 - this.evaporation / 100;

    // this.recup_eaux_uses_Fumier = this.produit2(p2, p3);

    // //Calcul recup_eaux_uses_Silo
    // let p4 = this.produit2(
    //   parseFloat(this.tas_ensilage_Silo),
    //   parseFloat(this.pluviometre)
    // );
    // this.recup_eaux_uses_Silo = this.produit2(p4, p3);
    // //Calcul de total eaux usées

    // this.total_eaux_uses =
    //   this.recup_eaux_uses_Fumier + this.recup_eaux_uses_Silo;
    // console.log("this.total_eaux_uses ", this.total_eaux_uses);

    // this.sum_of_vegTable_TMB = this.newFiche
    //   .filter((x) => x.IC1 == "2.Vegetal")
    //   .reduce(
    //     (accumulator, current) => accumulator + parseFloat(current.t_MB_an),
    //     0
    //   );

    this.sum_of_Autre_TMB = this.newFiche
      .filter((x) => x.IC1 == "3.Autres")
      .reduce(
        (accumulator, current) => accumulator + parseFloat(current.t_MB_an),
        0
      );

    this.TOTAL_TMB =
      this.sum_of_Animal_TMB + this.sum_of_Autre_TMB + this.sum_of_vegTable_TMB;

    this.res2 = Number(this.TOTAL_TMB).toFixed(2);

    console.log("ressss", this.res2);

    this.sum_of_Animal_TMS = this.newFiche
      .filter((x) => x.IC1 == "1.Animal")
      .reduce(
        (accumulator, current) => accumulator + parseFloat(current.t_MS_an),
        0
      );

    this.sum_of_vegTable_TMS = this.newFiche
      .filter((x) => x.IC1 == "2.Vegetal")
      .reduce(
        (accumulator, current) => accumulator + parseFloat(current.t_MS_an),
        0
      );

    this.sum_of_Autre_TMS = this.newFiche
      .filter((x) => x.IC1 == "3.Autres")
      .reduce(
        (accumulator, current) => accumulator + parseFloat(current.t_MS_an),
        0
      );

    this.TOTAL_TMS =
      this.sum_of_Animal_TMS + this.sum_of_Autre_TMS + this.sum_of_vegTable_TMS;
    this.res3 = Number(this.TOTAL_TMS).toFixed(2);

    //
    this.sum_of_Animal_NM3 = this.newFiche
      .filter((x) => x.IC1 == "1.Animal")
      .reduce(
        (accumulator, current) => accumulator + parseFloat(current.Nm3_CH4_an),
        0
      );

    this.sum_of_vegTable_NM3 = this.newFiche
      .filter((x) => x.IC1 == "2.Vegetal")
      .reduce(
        (accumulator, current) => accumulator + parseFloat(current.Nm3_CH4_an),
        0
      );

    this.sum_of_Autre_NM3 = this.newFiche
      .filter((x) => x.IC1 == "3.Autres")
      .reduce(
        (accumulator, current) => accumulator + parseFloat(current.Nm3_CH4_an),
        0
      );

    this.TOTAL_NM3 =
      this.sum_of_Animal_NM3 + this.sum_of_vegTable_NM3 + this.sum_of_Autre_NM3;
    this.res4 = Number(this.TOTAL_NM3).toFixed(2);
    //Division
    console.log("v.t_MB_an", parseFloat(v.t_MB_an));
    console.log("this.TOTAL_TMB", this.res2);

    this.division = this.quotion(v.t_MB_an, this.res2);
    console.log("this.division", this.division);
    v.ration = this.division;

    // this.rep_Financement_Fp=this.Mtn_Total_Concep_Contruc_inj - this.rep_Financement_bq ;

    // this.rep_Financement_bq_cog=this.produit2(0.75,this.Mtn_Total_Concep_Contruc_cog);
    // this.rep_Financement_Fp_cog=this.Mtn_Total_Concep_Contruc_cog - this.rep_Financement_bq_cog ;

    //calcule de N

    // this.sum_of_Animal_TMB != 0 &&

    this.sum1 =
      this.sum_of_Animal_TMB +
      this.sum_of_vegTable_TMB +
      this.total_eaux_uses +
      this.sum_of_Autre_TMB;
    this.sum2 =
      this.sum_of_Animal_TMS +
      this.sum_of_vegTable_TMS +
      this.f11 +
      this.sum_of_Autre_TMS;
    if (this.sum1 != 0) this.sum3 = this.quotion(this.sum2, this.sum1);
    else {
      this.sum3 = 0;
    }
    this.digistat_brut = this.produit2(0.9, this.sum1);
    this.digistat_liquide = this.produit2(0.8, this.digistat_brut);
    this.digistat_solide = this.produit2(0.2, this.digistat_brut);
    console.log("eventType", this.eventType);

    if (this.eventType === "2.Vegetal") {
      this.Terrain_culture_dedie = this.newFiche
        .filter((x) => x.quantite && x.IC1 == "2.Vegetal")
        .reduce(
          (accumulator, current) => accumulator + parseFloat(current.quantite),
          0
        );
      console.log("Terrain_culture_dedie", this.Terrain_culture_dedie);
    } else {
      this.Terrain_culture_dedie = 0;
    }

    this.digistat_liquide_requis = this.produit2(
      this.Quantite_fraction_liquide,
      this.Terrain_culture_dedie + this.autre_terrain
    );
    this.digistat_solide_requis = this.produit2(
      this.Quantite_fraction_solide,
      this.Terrain_culture_dedie + this.autre_terrain
    );
    this.digistat_liquide_exedent =
      this.digistat_liquide - this.digistat_liquide_requis;
    this.digistat_solide_exedent =
      this.digistat_solide - this.digistat_solide_requis;

    //F16
    if (
      this.sum_of_Autre_TMB != 0 &&
      this.sum_of_vegTable_TMB != 0 &&
      this.sum_of_Animal_TMB != 0
    ) {
      this.f16 = this.quotion(this.sum_of_Autre_TMS, this.sum_of_Autre_TMB);

      this.F14 = this.quotion(
        this.sum_of_vegTable_TMS,
        this.sum_of_vegTable_TMB
      );
      this.f13 = this.quotion(this.sum_of_Animal_TMS, this.sum_of_Animal_TMB);
    } else {
      this.f16 = 0;
      this.F14 = 0;
      this.f13 = 0;
    }

    this.infotrie2 = this.listenIc1(this.infotrie);
    // v.volume_Nm3_CH4_an = this.volume_Nm3_CH4_an;
    // v.somme_MB = this.somme_MB;
    // v.somme_MS = this.somme_MS;
    // v.somme_KWH = this.somme_KWH;

    if (this.editMode == true) {
      console.log("edit mod 2 ..POSITION", this.editMode, this.position);

      this.newFiche.splice(this.position, 1);

      // this.newFiche.splice(this.position, 1);
      console.log("this.updateElem", this.updateElem);
      v.quantite = this.quantite;
      v.InputValue = this.InputValue;
      v.volume_Nm3_CH4_an = this.volume_Nm3_CH4_an.toFixed(2);
      v.somme_MB = this.somme_MB.toFixed(2);
      v.somme_MS = this.somme_MS;
      v.somme_KWH = this.somme_KWH.toFixed(2);
      this.newFiche.push(v);
      this.formValue = v;
      this.editMode = false;
      this.resetForm();
      console.log("lol", this.newFiche);
    } else if (this.editMode == false) {
      console.log("this.editMode ", this.editMode);
      v.volume_Nm3_CH4_an = this.volume_Nm3_CH4_an;

      v.somme_MB = this.somme_MB;
      v.somme_MS = this.somme_MS;
      v.somme_KWH = this.somme_KWH;
      v.percent_rapport_NPK = this.percent_rapport_NPK;
      console.log("NOOOOOOOOOO", this.percent_rapport_NPK);

      this.newFiche.push(v);
      this.formValue = v;
      // this.resetForm()
      this.getFichesInfo();
    }
    console.log("arraaayForm", this.formValue);

    this.arrayForm.push(this.formValue);
    this.form.reset();
    this.currentStep = Steps.STEP_1;
    this.eventType = "";

    //somme Nm3Ch4
    console.log("this.arrayForm", this.arrayForm);

    this.volume_Nm3_CH4_an = this.arrayForm
      .filter((x) => x.Nm3_CH4_an)
      .reduce((accumulator, current) => {
        this.ss = accumulator + parseFloat(current.Nm3_CH4_an);

        return this.ss;
      }, 0);
    console.log("ss******************", this.ss);
    console.log("ss*******volume_Nm3_CH4_an", this.volume_Nm3_CH4_an);
    ///////////////Nouveau calcul debit horaire

    this.debit_horaire_Nm3_CH4_an = this.quotion(
      parseFloat(this.volume_Nm3_CH4_an),
      8760
    );

    console.log("debit", this.debit_horaire_Nm3_CH4_an);
    this.debit_moyen_annuel = this.produit2(
      this.debit_horaire_Nm3_CH4_an,
      0.88
    );

    this.Auto_consommation = this.produit2(this.debit_horaire_Nm3_CH4_an, 0.08);
    this.Poste_injection_pertes = this.produit2(
      this.debit_horaire_Nm3_CH4_an,
      0.04
    );

    this.debit_horaire_injecte_Nm3_CH4_an = this.produit2(
      this.debit_horaire_Nm3_CH4_an,
      0.92
    );
    this.s_tt_KWH_h = this.produit2(
      this.debit_horaire_injecte_Nm3_CH4_an,
      this.pvoir_calorfiq_sup_CH4
    );
    console.log("s_tt_KWH_h", this.s_tt_KWH_h);
    this.enrg_KWH_an = this.produit2(
      this.s_tt_KWH_h,
      this.heure_fonction
    ).toFixed(2);
    console.log("enrg_KWH_an", this.enrg_KWH_an);
    this.enrg_MWH_an = this.quotion(this.enrg_KWH_an, 1000);
    console.log("enrg_MWH_an", this.enrg_MWH_an);
    this.enrg_GWH_an = this.quotion(this.enrg_MWH_an, 1000);
    console.log("enrg_MWH_an", this.enrg_GWH_an);

    this.Tarif_debut_contrat2 = this.quotion(this.Tarif_debut_contrat1, 100);

    this.Recette_vente_biomethane = this.produit2(
      this.Tarif_debut_contrat2,
      this.s_tt_KWH_h
    );
    this.CA_annuel_energie = this.produit2(
      this.enrg_KWH_an,
      this.Tarif_debut_contrat2
    );
    this.Production_annuelle_biomethane_n1 = this.produit2(
      this.isNanFunction(this.Montee_charge_n1.replace("%", "")),
      this.enrg_MWH_an
    );
    this.Production_annuelle_biomethane_n1 =
      this.Production_annuelle_biomethane_n1.toFixed(2);
    this.Production_annuelle_biomethane_n2 = this.produit2(
      this.isNanFunction(this.Montee_charge_n2.replace("%", "")),
      this.enrg_MWH_an
    );
    this.Production_annuelle_biomethane_n2 =
      this.Production_annuelle_biomethane_n2.toFixed(2);
    this.Production_annuelle_biomethane_n3 = this.produit2(
      this.isNanFunction(this.Montee_charge_n3.replace("%", "")),
      this.enrg_MWH_an
    );
    this.Production_annuelle_biomethane_n3 =
      this.Production_annuelle_biomethane_n3.toFixed(2);

    this.Production_annuelle_biomethane_n4 = this.produit2(
      this.isNanFunction(this.Montee_charge_n4.replace("%", "")),
      this.enrg_MWH_an
    );
    this.Production_annuelle_biomethane_n4 =
      this.Production_annuelle_biomethane_n4.toFixed(2);
    this.Production_annuelle_biomethane_n5 = this.produit2(
      this.isNanFunction(this.Montee_charge_n5.replace("%", "")),
      this.enrg_MWH_an
    );
    this.Production_annuelle_biomethane_n5 =
      this.Production_annuelle_biomethane_n5.toFixed(2);
    this.Production_annuelle_biomethane_n6 = this.produit2(
      this.isNanFunction(this.Montee_charge_n6.replace("%", "")),
      this.enrg_MWH_an
    );
    this.Production_annuelle_biomethane_n6 =
      this.Production_annuelle_biomethane_n6.toFixed(2);
    this.Production_annuelle_biomethane_n7 = this.produit2(
      this.isNanFunction(this.Montee_charge_n7.replace("%", "")),
      this.enrg_MWH_an
    );
    this.Production_annuelle_biomethane_n7 =
      this.Production_annuelle_biomethane_n7.toFixed(2);
    this.Production_annuelle_biomethane_n8 = this.produit2(
      this.isNanFunction(this.Montee_charge_n8.replace("%", "")),
      this.enrg_MWH_an
    );
    this.Production_annuelle_biomethane_n8 =
      this.Production_annuelle_biomethane_n8.toFixed(2);
    this.Production_annuelle_biomethane_n9 = this.produit2(
      this.isNanFunction(this.Montee_charge_n9.replace("%", "")),
      this.enrg_MWH_an
    );
    this.Production_annuelle_biomethane_n9 =
      this.Production_annuelle_biomethane_n9.toFixed(2);

    this.Production_annuelle_biomethane_n10 = this.produit2(
      this.isNanFunction(this.Montee_charge_n10.replace("%", "")),
      this.enrg_MWH_an
    );
    this.Production_annuelle_biomethane_n10 =
      this.Production_annuelle_biomethane_n10.toFixed(2);
    this.Production_annuelle_biomethane_n11 = this.produit2(
      this.isNanFunction(this.Montee_charge_n11.replace("%", "")),
      this.enrg_MWH_an
    );
    this.Production_annuelle_biomethane_n11 =
      this.Production_annuelle_biomethane_n11.toFixed(2);
    this.Production_annuelle_biomethane_n12 = this.produit2(
      this.isNanFunction(this.Montee_charge_n12.replace("%", "")),
      this.enrg_MWH_an
    );
    this.Production_annuelle_biomethane_n12 =
      this.Production_annuelle_biomethane_n12.toFixed(2);
    this.Production_annuelle_biomethane_n13 = this.produit2(
      this.isNanFunction(this.Montee_charge_n13.replace("%", "")),
      this.enrg_MWH_an
    );
    this.Production_annuelle_biomethane_n13 =
      this.Production_annuelle_biomethane_n13.toFixed(2);
    this.Production_annuelle_biomethane_n14 = this.produit2(
      this.isNanFunction(this.Montee_charge_n14.replace("%", "")),
      this.enrg_MWH_an
    );
    this.Production_annuelle_biomethane_n14 =
      this.Production_annuelle_biomethane_n14.toFixed(2);
    this.Production_annuelle_biomethane_n15 = this.produit2(
      this.isNanFunction(this.Montee_charge_n15.replace("%", "")),
      this.enrg_MWH_an
    );
    this.Production_annuelle_biomethane_n15 =
      this.Production_annuelle_biomethane_n15.toFixed(2);
    this.Tarif_biomethane_n1 = this.produit2(this.Tarif_debut_contrat2, 1000);
    this.Tarif_biomethane_n1 = this.Tarif_biomethane_n1.toFixed(2);
    this.Tarif_biomethane_n2 = this.produit2(
      this.Tarif_biomethane_n1,
      this.Inflation_tarif_GRDF_n2 + 1
    );
    this.Tarif_biomethane_n2 = this.Tarif_biomethane_n2.toFixed(2);
    this.Tarif_biomethane_n3 = this.produit2(
      this.Tarif_biomethane_n2,
      this.Inflation_tarif_GRDF_n3 + 1
    );
    this.Tarif_biomethane_n3 = this.Tarif_biomethane_n3.toFixed(2);
    this.Tarif_biomethane_n4 = this.produit2(
      this.Tarif_biomethane_n3,
      this.Inflation_tarif_GRDF_n4 + 1
    );
    this.Tarif_biomethane_n4 = this.Tarif_biomethane_n4.toFixed(2);
    this.Tarif_biomethane_n5 = this.produit2(
      this.Tarif_biomethane_n4,
      this.Inflation_tarif_GRDF_n5 + 1
    );
    this.Tarif_biomethane_n5 = this.Tarif_biomethane_n5.toFixed(2);
    this.Tarif_biomethane_n6 = this.produit2(
      this.Tarif_biomethane_n5,
      this.Inflation_tarif_GRDF_n6 + 1
    );
    this.Tarif_biomethane_n6 = this.Tarif_biomethane_n6.toFixed(2);
    this.Tarif_biomethane_n7 = this.produit2(
      this.Tarif_biomethane_n6,
      this.Inflation_tarif_GRDF_n7 + 1
    );
    this.Tarif_biomethane_n7 = this.Tarif_biomethane_n7.toFixed(2);
    this.Tarif_biomethane_n8 = this.produit2(
      this.Tarif_biomethane_n7,
      this.Inflation_tarif_GRDF_n8 + 1
    );
    this.Tarif_biomethane_n8 = this.Tarif_biomethane_n8.toFixed(2);
    this.Tarif_biomethane_n9 = this.produit2(
      this.Tarif_biomethane_n8,
      this.Inflation_tarif_GRDF_n9 + 1
    );
    this.Tarif_biomethane_n9 = this.Tarif_biomethane_n9.toFixed(2);
    this.Tarif_biomethane_n10 = this.produit2(
      this.Tarif_biomethane_n9,
      this.Inflation_tarif_GRDF_n10 + 1
    );
    this.Tarif_biomethane_n10 = this.Tarif_biomethane_n10.toFixed(2);
    this.Tarif_biomethane_n11 = this.produit2(
      this.Tarif_biomethane_n10,
      this.Inflation_tarif_GRDF_n11 + 1
    );
    this.Tarif_biomethane_n11 = this.Tarif_biomethane_n11.toFixed(2);
    this.Tarif_biomethane_n12 = this.produit2(
      this.Tarif_biomethane_n11,
      this.Inflation_tarif_GRDF_n12 + 1
    );
    this.Tarif_biomethane_n12 = this.Tarif_biomethane_n12.toFixed(2);
    this.Tarif_biomethane_n13 = this.produit2(
      this.Tarif_biomethane_n12,
      this.Inflation_tarif_GRDF_n13 + 1
    );
    this.Tarif_biomethane_n13 = this.Tarif_biomethane_n13.toFixed(2);
    this.Tarif_biomethane_n14 = this.produit2(
      this.Tarif_biomethane_n13,
      this.Inflation_tarif_GRDF_n14 + 1
    );
    this.Tarif_biomethane_n14 = this.Tarif_biomethane_n14.toFixed(2);
    this.Tarif_biomethane_n15 = this.produit2(
      this.Tarif_biomethane_n14,
      this.Inflation_tarif_GRDF_n15 + 1
    );
    this.Tarif_biomethane_n15 = this.Tarif_biomethane_n15.toFixed(2);

    this.Vente_Biomethane_n1 = this.produit2(
      this.Tarif_biomethane_n1,
      this.Production_annuelle_biomethane_n1
    );
    this.Vente_Biomethane_n1 = this.Vente_Biomethane_n1.toFixed(2);
    this.Vente_Biomethane_n2 = this.produit2(
      this.Tarif_biomethane_n1,
      this.Production_annuelle_biomethane_n2
    );
    this.Vente_Biomethane_n2 = parseFloat(this.Vente_Biomethane_n2);

    this.Vente_Biomethane_n3 = this.produit2(
      this.Tarif_biomethane_n3,
      this.Production_annuelle_biomethane_n3
    );
    this.Vente_Biomethane_n3 = parseFloat(this.Vente_Biomethane_n3);

    this.Vente_Biomethane_n4 = this.produit2(
      this.Tarif_biomethane_n4,
      this.Production_annuelle_biomethane_n4
    );
    this.Vente_Biomethane_n4 = this.Vente_Biomethane_n4.toFixed(2);
    this.Vente_Biomethane_n5 = this.produit2(
      this.Tarif_biomethane_n5,
      this.Production_annuelle_biomethane_n5
    );
    this.Vente_Biomethane_n5 = this.Vente_Biomethane_n5.toFixed(2);
    this.Vente_Biomethane_n6 = this.produit2(
      this.Tarif_biomethane_n6,
      this.Production_annuelle_biomethane_n6
    );
    this.Vente_Biomethane_n6 = this.Vente_Biomethane_n6.toFixed(2);
    this.Vente_Biomethane_n7 = this.produit2(
      this.Tarif_biomethane_n7,
      this.Production_annuelle_biomethane_n7
    );
    this.Vente_Biomethane_n7 = this.Vente_Biomethane_n7.toFixed(2);
    this.Vente_Biomethane_n8 = this.produit2(
      this.Tarif_biomethane_n8,
      this.Production_annuelle_biomethane_n8
    );
    this.Vente_Biomethane_n8 = this.Vente_Biomethane_n8.toFixed(2);
    this.Vente_Biomethane_n9 = this.produit2(
      this.Tarif_biomethane_n9,
      this.Production_annuelle_biomethane_n9
    );
    this.Vente_Biomethane_n9 = this.Vente_Biomethane_n9.toFixed(2);
    this.Vente_Biomethane_n10 = this.produit2(
      this.Tarif_biomethane_n10,
      this.Production_annuelle_biomethane_n10
    );
    this.Vente_Biomethane_n10 = this.Vente_Biomethane_n10.toFixed(2);
    this.Vente_Biomethane_n11 = this.produit2(
      this.Tarif_biomethane_n11,
      this.Production_annuelle_biomethane_n11
    );
    this.Vente_Biomethane_n11 = this.Vente_Biomethane_n11.toFixed(2);
    this.Vente_Biomethane_n12 = this.produit2(
      this.Tarif_biomethane_n12,
      this.Production_annuelle_biomethane_n12
    );
    this.Vente_Biomethane_n12 = this.Vente_Biomethane_n12.toFixed(2);
    this.Vente_Biomethane_n13 = this.produit2(
      this.Tarif_biomethane_n13,
      this.Production_annuelle_biomethane_n13
    );
    this.Vente_Biomethane_n13 = this.Vente_Biomethane_n13.toFixed(2);
    this.Vente_Biomethane_n14 = this.produit2(
      this.Tarif_biomethane_n14,
      this.Production_annuelle_biomethane_n14
    );
    this.Vente_Biomethane_n14 = this.Vente_Biomethane_n14.toFixed(2);
    this.Vente_Biomethane_n15 = this.produit2(
      this.Tarif_biomethane_n15,
      this.Production_annuelle_biomethane_n15
    );
    this.Vente_Biomethane_n15 = this.Vente_Biomethane_n15.toFixed(2);
    this.Redevance_traitement_dechets_n1 = this.produit(
      this.Tarif_biomethane_n1,
      this.Production_annuelle_biomethane_n1,
      this.Redevance_traitement_dechets
    );
    this.Redevance_traitement_dechets_n2 = this.produit(
      this.Tarif_biomethane_n2,
      this.Production_annuelle_biomethane_n2,
      this.Redevance_traitement_dechets
    );
    this.Redevance_traitement_dechets_n3 = this.produit(
      this.Tarif_biomethane_n3,
      this.Production_annuelle_biomethane_n3,
      this.Redevance_traitement_dechets
    );
    this.Redevance_traitement_dechets_n4 = this.produit(
      this.Tarif_biomethane_n4,
      this.Production_annuelle_biomethane_n4,
      this.Redevance_traitement_dechets
    );
    this.Redevance_traitement_dechets_n5 = this.produit(
      this.Tarif_biomethane_n5,
      this.Production_annuelle_biomethane_n5,
      this.Redevance_traitement_dechets
    );
    this.Redevance_traitement_dechets_n6 = this.produit(
      this.Tarif_biomethane_n6,
      this.Production_annuelle_biomethane_n6,
      this.Redevance_traitement_dechets
    );
    this.Vente_digestat_solide_n1 = this.produit2(
      this.isNanFunction(this.Prix_digestat_Solide),
      this.isNanFunction(this.Quantite_digestat_Solide)
    );
    this.Vente_digestat_liquide_n2 = this.produit2(
      this.Vente_digestat_solide_n1,
      1 + 0.01
    );
    this.Vente_Biomethane_n3 = this.produit2(
      this.Vente_digestat_solide_n2,
      1 + 0.01
    );
    this.Vente_Biomethane_n4 = this.produit2(
      this.Vente_digestat_solide_n3,
      1 + 0.01
    );
    this.Vente_Biomethane_n4 = this.produit2(
      this.Vente_digestat_solide_n3,
      1 + 0.01
    );

    //somme kwh
    this.somme_KWH = this.newFiche
      .filter((x) => x.KWe_h)
      .reduce(
        (accumulator, current) => accumulator + parseFloat(current.KWe_h),
        0
      );

    console.log("som_KWH", this.somme_KWH);
    // //somme MS
    // this.somme_MS = this.newFiche
    //   .filter((x) => x.t_MS_an)
    //   .reduce(
    //     (accumulator, current) => accumulator + parseFloat(current.t_MS_an),
    //     0
    //   );

    // console.log("somme_MB****************************************", this.somme_MS);
    //Somme MB
    this.somme_MB = this.newFiche
      .filter((x) => x.t_MB_an)
      .reduce(
        (accumulator, current) => accumulator + parseFloat(current.t_MB_an),
        0
      );

    console.log("somme_MB", this.somme_MB);
    console.log("ss", this.ss);

    //Calcul percentage Effluent_Delevage pour la feuille produit
    console.log("new aarayy formmap ");
    console.log(
      "TMMMMMMMMMMMMMMBBBBBBBBBBBBBBBB",
      this.newFiche
        .filter((x) => x.Effluent_Delevage == "Oui")
        .reduce((acc, curr) => acc + parseFloat(curr.t_MB_an), 0)
    );

    this.percent_eff_elevage = this.newFiche
      .filter((x) => x.Effluent_Delevage == "Oui")
      .reduce((acc, curr) => acc + parseFloat(curr.t_MB_an), 0);

    console.log("WHYYYYYYYYYYYaaaaa", this.percent_eff_elevage);

    this.percent_eff_elevage = this.quotion(
      this.percent_eff_elevage,
      this.somme_MB
    );
    console.log("La SOMME ", this.somme_MB);

    console.log("WHYYYYYYYYYYY", this.percent_eff_elevage);

    //-----------------fin calcul %eff elevage-----------------------------------------------

    //------------------Debut calcul Feuille BP injection------------------------------------
    console.log("azerty", this.constructions);
    this.Total_autres =
      this.isNanFunction(this.Hypotheque) +
      this.isNanFunction(this.BFR_Frais_Financier) +
      this.isNanFunction(this.bfr_consommable) +
      this.isNanFunction(this.Audit_assurantiel) +
      this.isNanFunction(this.Audit_juridique) +
      this.isNanFunction(this.Audit_Technique) +
      this.isNanFunction(this + this.Audit_Fiscal) +
      this.isNanFunction(this.Convention_de_credit_dette_syndiquee) +
      this.isNanFunction(this.Suivi_de_chantier + this.In_Front_Oblig);
    console.log(
      "Total_autres",
      this.Total_autres,
      this.isNanFunction(this.Hypotheque),
      this.isNanFunction(this.bfr_consommable),
      this.isNanFunction(this.Audit_Technique),
      this.isNanFunction(this.In_Front_Oblig)
    );

    this.total_invest =
      this.isNanFunction(
        this.constructions[0].Tab_140.Ouverture_chantier.Sous_Total_Prix_vente
      ) +
      this.isNanFunction(
        this.constructions[0].Tab_140.Lot_1_Process_methanisation
          .Sous_Total_Prix_vente
      ) +
      this.isNanFunction(
        this.constructions[0].Tab_140.Lot_2_Valorisation.Sous_Total_Prix_vente
      ) +
      this.isNanFunction(
        this.constructions[0].Tab_140
          .Lot_3_Terrassement_Grande_Masse_Talutage_VRD.Sous_Total_Prix_vente
      ) +
      this.isNanFunction(
        this.constructions[0].Tab_140
          .Lot_4_Genie_Civil_circulaire_digestat_liquide_couverture_simple
          .Sous_Total_Prix_vente
      ) +
      this.isNanFunction(
        this.constructions[0].Tab_140.Lot_5_Genie_Civil_ouvrages_peripheriques
          .Sous_Total_Prix_vente
      ) +
      this.isNanFunction(
        this.constructions[0].Tab_140.Lot_6_Charpente_Batiment_Couverture
          .Sous_Total_Prix_vente
      ) +
      this.isNanFunction(
        this.constructions[0].Tab_140
          .Lot_7_Courant_fort_Soutirage_Electricite_Generale
          .Sous_Total_Prix_vente
      ) +
      this.isNanFunction(
        this.constructions[0].Tab_140.Maitrise_oevre.Sous_Total_Prix_vente
      ) +
      this.isNanFunction(
        this.constructions[0].Tab_140.Assistance_maitrise_ouvrage
          .Sous_Total_Prix_vente
      ) +
      this.isNanFunction(this.grdf) +
      this.isNanFunction(this.Total_autres) +
      this.isNanFunction(
        this.constructions[0].Tab_140.Materiel.Sous_Total_Prix_vente
      ) +
      this.isNanFunction(this.constructions[0].totaux_prixVente_Total);
    console.log("this.total_invest*********", this.total_invest);

    this.FONDS_PROPRES = this.produit2(this.total_invest, 0.25);
    console.log("FONDS_PROPRES", this.FONDS_PROPRES);
    this.BFR_Frais_Financier = this.produit2(
      this.total_invest -
        this.isNanFunction(this.Total_autres) +
        this.Hypotheque +
        this.Audit_assurantiel +
        this.Audit_juridique +
        this.Audit_Technique +
        this.Audit_Fiscal +
        this.Convention_de_credit_dette_syndiquee +
        this.Suivi_de_chantier +
        this.In_Front_Oblig,
      0.0215
    );
    console.log("BFR_Frais_Financier**********", this.BFR_Frais_Financier);

    this.SUBVENTION = this.produit2(this.total_invest, 0.1);
    console.log("SUBVENTION", this.SUBVENTION);
    this.CAPITAL_APPORT_COMPTE_COURANt = this.produit2(
      this.FONDS_PROPRES - this.SUBVENTION,
      0.01
    );
    console.log(
      "CAPITAL_APPORT_COMPTE_COURANt",
      this.CAPITAL_APPORT_COMPTE_COURANt
    );
    this.EMPRUNT_CAPITAL =
      this.FONDS_PROPRES - this.SUBVENTION - this.CAPITAL_APPORT_COMPTE_COURANt;
    this.EMPRUNT_LONG_ERME = this.total_invest - this.FONDS_PROPRES;

    //TOTAL_FINANCEMENTS

    this.TOTAL_FINANCEMENTS =
      this.isNanFunction(this.FONDS_PROPRES) +
      this.isNanFunction(this.LOCATION_VENTE_CONSTRUCTEUR) +
      this.isNanFunction(this.EMPRUNT_LONG_ERME);

    console.log(
      "TOTAL_FINANCEMENTS",
      this.TOTAL_FINANCEMENTS,
      this.isNanFunction(this.FONDS_PROPRES),
      this.isNanFunction(this.LOCATION_VENTE_CONSTRUCTEUR),
      this.isNanFunction(this.EMPRUNT_LONG_ERME)
    );
    this.percent_capital_apport = this.quotion(
      this.CAPITAL_APPORT_COMPTE_COURANt,
      this.total_invest
    );
    this.percent_emprunt_capital = this.quotion(
      this.EMPRUNT_CAPITAL,
      this.total_invest
    );
    this.percent_location = this.quotion(
      this.LOCATION_VENTE_CONSTRUCTEUR,
      this.total_invest
    );
    this.percent_emprunt_long_terme = this.quotion(
      this.EMPRUNT_LONG_ERME,
      this.total_invest
    );

    //------------------Fin Calcul BP injection

    this.sum_of_Animal_TMB = this.newFiche
      .filter((x) => x.IC1 == "1.Animal")
      .reduce(
        (accumulator, current) => accumulator + parseFloat(current.t_MB_an),
        0
      );
    console.log("sumTMBAnimal", this.sum_of_Animal_TMB);
    //Calcul Culture de feuille digestat
    this.sum_of_vegTable_TMB = this.newFiche
      .filter((x) => x.IC1 == "2.Vegetal")
      .reduce(
        (accumulator, current) => accumulator + parseFloat(current.t_MB_an),
        0
      );

    //bloc Digestat Calcul
    let p = this.produit2(12, this.Mois_fumiere);
    if (this.Densite_Fumier != 0 && p != 0 && this.hauteur_Fumier != 0) {
      let q = this.quotion(this.sum_of_Animal_TMB, this.Densite_Fumier);

      let q1 = this.quotion(q, p);
      this.tas_ensilage_Fumier = this.quotion(q1, this.hauteur_Fumier).toFixed(
        2
      );
    }
    //Calcul de tas_ensilage_Silo
    let x1 = this.produit2(12, this.mois_Silo);
    if (this.Densite_Silo != 0 && x1 != 0 && this.hauteur_Silo != 0) {
      let q = this.quotion(this.sum_of_Animal_TMB, this.Densite_Silo);

      let q1 = this.quotion(q, x1);
      this.tas_ensilage_Silo = this.quotion(q1, this.hauteur_Silo).toFixed(2);
    }
    //Calcul de recup_eaux_uses_Fumier
    let p2 = this.produit2(
      parseFloat(this.tas_ensilage_Fumier),
      parseFloat(this.pluviometre)
    );

    let p3 = 1 - this.evaporation / 100;

    this.recup_eaux_uses_Fumier = this.produit2(p2, p3);

    //Calcul recup_eaux_uses_Silo
    let p4 = this.produit2(
      parseFloat(this.tas_ensilage_Silo),
      parseFloat(this.pluviometre)
    );
    this.recup_eaux_uses_Silo = this.produit2(p4, p3);
    //Calcul de total eaux usées

    this.total_eaux_uses =
      this.recup_eaux_uses_Fumier + this.recup_eaux_uses_Silo;

    this.total_type_intrant =
      this.total_eaux_uses + this.sum_of_Animal_TMB + this.sum_of_vegTable_TMB;

    this.digistat_liquide = this.produit2(
      this.total_digestat,
      this.quotion(80, 100)
    );
    this.digistat_solide = this.produit2(
      this.total_digestat,
      this.quotion(20, 100)
    );

    this.total_quantite_vegetal = this.newFiche
      .filter((x) => x.IC1 == "2.Vegetal")
      .reduce(
        (accumulator, current) => accumulator + parseFloat(current.quantite),
        0
      );

    this.terrain_Autre = 0;
    this.total_terrain = this.total_quantite_vegetal + this.terrain_Autre;

    this.Digestat_Liquide_Requis = this.produit2(
      this.total_terrain,
      this.quotion(30, 100)
    );
    this.Digestat_Solide_Requis = this.produit2(
      this.total_terrain,
      this.quotion(12, 100)
    );
    this.total_Epandage =
      this.Digestat_Liquide_Requis + this.Digestat_Solide_Requis;

    this.digistat_liquide_exedent =
      this.digistat_liquide - this.Digestat_Liquide_Requis;
    this.digistat_solide_exedent =
      this.digistat_solide - this.Digestat_Solide_Requis;

    let tabOfQuantite: any[] = [];
    let tabOfTotQuantite: any[] = [];
    this.total_quantite_total = this.newFiche
      .filter((x) => x.quantite)
      .reduce((accumulator, current) => {
        tabOfQuantite.push(parseFloat(current.quantite));
        tabOfTotQuantite.push(accumulator + parseFloat(current.quantite));
        let tabOfPerc: any[] = [];

        tabOfQuantite.map((x, index) => {
          tabOfPerc.push(
            this.quotion(x, tabOfTotQuantite[this.newFiche.length - 1])
          );
          this.perDegestat = tabOfPerc;
          console.log("tabOfPerc", tabOfPerc);
          console.log("tab length ", tabOfPerc.length);
          // if(tabOfPerc.length==1){
          //   this.totPercentDegest =1
          // }

          // this.totPercentDegest= this.perDegestat.reduce((acc,current)=>{
          //   console.log("tab acc,current,index",acc,current)
          //     return this.totPercentDegest = acc+current

          // })
          //console.log("tab sum per",this.totPercentDegest)
          let i;
          let b = 0;
          this.totPercentDegest = 0;
          for (i = 0; i < tabOfPerc.length; i++) {
            console.log("tab i", i, tabOfPerc[i]);

            this.totPercentDegest += tabOfPerc[i];

            console.log("tab TAB totPercentDegest", this.totPercentDegest);
          }
        });
        return accumulator + parseFloat(current.quantite);
      }, 0);

    // v.total_quantite_total=this.total_quantite_total;
    // console.log("HEEEEEEEEY",v.total_quantite_total);

    v.percent_rapport_NPK = this.percent_rapport_NPK;

    this.total_percent = this.newFiche
      .filter((x) => x.percent_rapport_NPK)
      .reduce((accumulator, current) => {
        accumulator + parseFloat(current.percent_rapport_NPK);
      }, 0);

    this.total_N = this.newFiche
      .filter((x) => x.N)
      .reduce((accumulator, current) => accumulator + parseFloat(current.N), 0);
    this.total_N = this.total_N.toFixed(2);
    this.total_P = this.newFiche
      .filter((x) => x.P)
      .reduce((accumulator, current) => accumulator + parseFloat(current.P), 0);
    this.total_K = this.newFiche
      .filter((x) => x.K)
      .reduce((accumulator, current) => accumulator + parseFloat(current.K), 0);

    if (this.ss >= 0 && this.ss <= 140) {
      this.D = this.exploitations[0];
      this.bfr_consommable =
        this.D.Tab140.tabExploi_140_ChargesConsommables.Charbon_actif.an;
      this.Nmbre_h_par_mois = this.quotion(
        this.D.Tab140.Charges_Exploitation.Conduite_unite_methanisation.an,
        12
      );
      console.log("Nmbre_h_par_mois***", this.Nmbre_h_par_mois);

      this.c = this.constructions[0];

      console.log("DOPEX,CCAPEX", this.D, this.c);
      return this.c && this.D;
    } else if (this.ss > 141 && this.ss <= 190) {
      this.D = this.exploitations[1];
      this.bfr_consommable =
        this.D.Tab190.tabExploi_190_ChargesConsommables.Charbon_actif.an;

      this.c = this.constructions[1];

      return this.c && this.D;
    } else if (this.ss > 191 && this.ss <= 240) {
      this.D = this.exploitations[2];
      this.bfr_consommable =
        this.D.Tab240.tabExploi_240_ChargesConsommables.Charbon_actif.an;
      this.c = this.constructions[2];

      return this.c && this.D;
    } else if (this.ss > 241 && this.ss <= 280) {
      this.c = this.constructions[3];
      this.bfr_consommable =
        this.D.Tab280.tabExploi_280_ChargesConsommables.Charbon_actif.an;
      this.D = this.exploitations[3];

      return this.c && this.D;
    } else if (this.ss > 281 && this.ss <= 560) {
      this.D = this.exploitations[4];
      this.bfr_consommable =
        this.D.Tab560.tabExploi_560_ChargesConsommables.Charbon_actif.an;
      this.c = this.constructions[4];

      return this.c && this.D;
    } else if (this.ss > 561 && this.ss <= 760) {
      this.D = this.exploitations[5];
      this.bfr_consommable =
        this.D.Tab760.tabExploi_760_ChargesConsommables.Charbon_actif.an;
      this.c = this.constructions[5];

      return this.c && this.D;
    } else if (this.ss > 761 && this.ss <= 960) {
      this.D = this.exploitations[6];
      this.bfr_consommable =
        this.D.Tab960.tabExploi_960_ChargesConsommables.Charbon_actif.an;
      this.c = this.constructions[6];

      return this.c && this.D;
    } else if (this.ss > 961 && this.ss <= 1120) {
      this.D = this.exploitations[7];
      this.bfr_consommable =
        this.D.Tab1120.tabExploi_1120_ChargesConsommables.Charbon_actif.an;
      this.c = this.constructions[7];

      return this.c && this.D;
    }

    this.calaculPrixDeBase(500);

    this.getFichesInfo();
  }

  listen_total_Quantite_NPK(event) {
    console.log("eve", event);
    this.percent_rapport_NPK = this.quotion(this.formValue.quantite, event);
    console.log("avant v", this.percent_rapport_NPK);
    return this.percent_rapport_NPK;
  }
  listenInput_Percent(event) {
    this.total_digestat = this.produit2(
      this.total_type_intrant,
      this.quotion(parseFloat(event), 100)
    ).toFixed(2);
    this.Digestat_Brut_quantite = this.produit2(
      this.total_quantite_total,
      this.quotion(parseFloat(event), 100)
    );
    this.Digestat_Brut_percent = event;
    this.Digestat_Brut_N = this.quotion(
      this.total_N,
      this.Digestat_Brut_quantite
    ).toFixed(2);

    this.Digestat_Brut_P = this.quotion(
      this.total_P,
      this.Digestat_Brut_quantite
    ).toFixed(2);
    this.Digestat_Brut_K = this.quotion(
      this.total_K,
      this.Digestat_Brut_quantite
    ).toFixed(2);
  }
  listenInput_Deg_Liquide(event) {
    this.digistat_liquide = this.produit2(
      this.total_digestat,
      this.quotion(parseFloat(event), 100)
    ).toFixed(2);
    this.Digestat_LIQUIDE_quantite = this.produit2(
      this.Digestat_Brut_quantite,
      this.quotion(parseFloat(event), 100)
    ).toFixed(2);
    this.Digestat_LIQUIDE_percent = event;
    this.Digestat_LIQUIDE_N = this.produit2(
      this.Digestat_Brut_N,
      this.quotion(parseFloat(event), 100)
    ).toFixed(2);
    this.Digestat_LIQUIDE_P = this.produit2(
      this.Digestat_Brut_P,
      this.quotion(parseFloat(event), 100)
    ).toFixed(2);
    this.Digestat_LIQUIDE_K = this.produit2(
      this.Digestat_Brut_K,
      this.quotion(parseFloat(event), 100)
    ).toFixed(2);
  }
  listenInput_Deg_Solide(event) {
    this.digistat_solide = this.produit2(
      this.total_digestat,
      this.quotion(parseFloat(event), 100)
    ).toFixed(2);
    this.Digestat_SOLIDE_quantite = this.produit2(
      this.Digestat_Brut_quantite,
      this.quotion(parseFloat(event), 100)
    ).toFixed(2);
    this.Digestat_SOLIDE_percent = event;
    this.Digestat_SOLIDE_N = this.produit2(
      this.Digestat_Brut_N,
      this.quotion(parseFloat(event), 100)
    ).toFixed(2);
    this.Digestat_SOLIDE_P = this.produit2(
      this.Digestat_Brut_P,
      this.quotion(parseFloat(event), 100)
    ).toFixed(2);
    this.Digestat_SOLIDE_K = this.produit2(
      this.Digestat_Brut_K,
      this.quotion(parseFloat(event), 100)
    ).toFixed(2);
  }

  addFiche() {
    console.log("val val", this.formValue);

    this.arrayForm.map((x) => {
      this.agriSrv.addFicheClient(x).subscribe(
        (data: any) => {
          // if (data) this.toastr.success("ajouter avec succés");
          console.log("data072", data);
          // this.form.reset();
        },
        (err) => {
          let msg = "verifier les champs saisie";
          // this.toastr.warning(err.error.msgsrv);
          this.toastr.warning(msg);
        }
      );
    });
  }

  delete(c) {
    let index = this.newFiche.indexOf(c);
    console.log("iiiiindex", index);

    if (index !== -1) {
      this.newFiche.splice(index, 1);
    }
    this.arrayForm = this.newFiche;

    console.log("contentBeforeDelete", this.newFiche);
  }

  indexToUpdate;
  q;
  ic1;
  ic2: string;
  ic3;
  desc_biblio;
  u;
  mb;
  ms;
  perc_Ms;
  mo;
  nm3;
  des;
  mb_an;
  ms_an;
  nm3_an;

  editMode: boolean = false;
  position;
  updateElem;
  indexRow(a) {
    this.tab = 1;
    this.openTab(1);
    this.updateElem = a;
    this.editMode = true;
    console.log("aaaaa", a);
    // this.indexToUpdate = a._id;
    // console.log(this.indexToUpdate);
    let index = this.newFiche.indexOf(a);
    console.log(index);
    this.position = index;
    this.q = a.quantite;
    this.mb_an = a.t_MB_an;
    console.log("mb_an", this.mb_an);

    this.ic1 = a.IC1;

    this.ic2 = a.IC2;
    console.log("ic2", this.ic2);
    this.ic3 = a.IC3;
    console.log("ic3", this.ic3);
    this.desc_biblio = a.Description;
    this.u = a.Unitee;
    this.mb = a.uMB_an;
    console.log("mb%%%%%%%%", this.mb);

    this.ms = a.Effluent_Delevage;
    this.perc_Ms = a.MS;
    this.mo = a.MO_MS;
    this.nm3 = a.Nm3_CH4_t_MO;
    this.des = a.description;
    this.mb_an = a.t_MB_an;
    this.ms_an = a.t_MS_an;
    this.nm3_an = a.Nm3_CH4_an;

    this.newFiche.splice(index, 1);
    this.form.setValue(a);
  }

  editDomain() {
    this.isVisible = true;
  }
  //   $scope.getTotal = function(){
  //     var total = 0;
  //     for(var i = 0; i < $scope.cart.products.length; i++){
  //         var product = $scope.cart.products[i];
  //         total += (product.price * product.quantity);
  //     }
  //     return total;
  // }

  // function() {
  //   this.newFiche.map((x) => {
  //     console.log("xxxxMAAAAAP,,", x);

  //     if (this.eventType == "1.Animal") {
  //       let S1 = 0;
  //       console.log("v.t_MB_an 1.Animal", x.t_MB_an);
  //       S1 += x.t_MB_an;
  //       console.log("S&&&&&&&&&&", S1);

  //       x.S_tt_exp_I = S1;
  //     }
  //     //  if (this.eventType=='2.Vegetal')
  //     // {let S2=0;
  //     //   console.log("v.t_MB_an 2.Vegetal",x.t_MB_an);
  //     //   S2+=x.t_MB_an
  //     // console.log("S1 2.Vegetal",S2);
  //     // x.S_tt_exp_II=S2

  //     // }
  //   });
  // }

  produit(x, y, z) {
    return x * y * z;
  }
  produit2(x, y) {
    return x * y;
  }
  quotion(x, y) {
    return x / y;
  }
  substraction(a, b) {
    return a - b;
  }
  saveAllFiche() {
    //this.srv.saveAll(this.newFiche).sub(data)
  }
  t_MB;
  t_MS;
  prix_intrants_MB;
  prix_intrants_MS;

  formule(value) {
    console.log("valueeee", value);

    console.log("this.base_prix", this.base_prix);
    console.log("this.prix", this.prix);

    if (this.prix && this.base_prix === "MB") {
      this.t_MB = this.prix;
      console.log("x", this.t_MB);
      console.log("tms", typeof this.t_MS);
      console.log("this.MSSSSSS", this.infotrie5.MS);

      this.t_MS = this.produit2(
        parseFloat(this.t_MB),
        parseFloat(this.infotrie5.MS)
      );

      console.log("x", this.t_MS);
      this.prix_intrants_MS = this.produit2(this.t_MS, this.t_MS_an);

      this.prix_intrants_MB = this.produit2(this.t_MB, this.t_MB_an);
    }
    if (this.prix && this.base_prix === "MS") {
      console.log("MS", typeof this.MS);
      console.log("Prix", typeof this.prix);

      this.t_MB = this.produit2(
        parseFloat(this.prix),
        parseFloat(this.infotrie5.MS)
      );
      this.prix_intrants_MB = this.produit2(this.t_MB, this.t_MB_an);

      this.t_MS = this.prix;
      console.log("x", this.t_MB, this.t_MS);
      this.prix_intrants_MS = this.produit2(this.t_MS, this.t_MS_an);
    }
  }
  scenariFp(value) {
    console.log("valueofscenariFp", value);
    console.log("fb", this.Financement_Fonds_Propres);
    console.log("aaaaa");
    if (value && value === "non") {
      console.log("aaaaa");

      this.Pourcentage_FP_Financer = 0;
      console.log("Pourcentage_FP_Financer", this.Pourcentage_FP_Financer);
    } else {
      this.Pourcentage_FP_Financer = "";
    }
  }
  // scenariDigestat(value) {
  //   console.log("valueofscenariFp", value);
  //   console.log("fb", this.vente_digestat);

  //   if (value === "non") {
  //     this.Prix_digestat_Liquide = 0;
  //     this.Prix_digestat_Solide = 0;
  //   } else {
  //     this.Prix_digestat_Liquide = "3.5£";
  //     this.Prix_digestat_Solide = "6£";
  //   }
  // }
  openModal = false;
  popAlert() {
    Swal.fire({
      title: "voulez vous valider la création d’un nouvel intrant ?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "oui, valider!",
      cancelButtonText: "Non, abondonner",
    }).then((result) => {
      if (result.value) {
        $("#change_password").modal("show");
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        $("#change_password").modal("hide");
        Swal.fire("Anuuler", "Votre modification est annulé :)", "error");
      }
    });
  }
  produit3(x, y, z, t) {
    return x * y * z * t;
  }

  msg = "";

  ModifierUMB(el) {
    if (el === undefined) {
      console.log(el);
    }
    console.log("$$$$$", el);

    let a = this.infotrie5.uMB_an;
    a = this.isNanFunction(el);
    // console.log("aaa", a);

    this.t_MB_an = this.produit2(a, this.isNanFunction(this.quantite));
    console.log("bbb", a);
    console.log("ccc", this.isNanFunction(this.quantite));
    // console.log("t_MB****", this.t_MB_an);
    // console.log("a apres modifier", a);
    this.exampleModal.nativeElement.click();
    // this.valuesaveContent.t_MB_an=val
  }

  readFormModal(value, abc) {
    console.log("abc", abc);
    this.valuesaveContent = abc;
    const a = this.infos.find((x) => x.uMB_an == value.uMB_an);

    // this.infos.push();
    console.log("valuesaveContent", this.valuesaveContent);

    this.valuesaveContent.uMB_an = value.uMB_an;

    console.log("this.valueSave", this.valuesaveContent);
    // this.newFiche.push(this.valuesaveContent);
    this.agriSrv.addFicheClient(this.valuesaveContent).subscribe(
      (data: any) => {
        if (data) this.toastr.success("ajouter avec succés");
        console.log("data error", data.msgsrv);
        this.resetForm();
      },
      (err) => {
        let msg = "verifier les champs saisie";
        // this.toastr.warning(err.error.msgsrv);
        this.toastr.warning(msg);
      }
    );

    $("#change_password").modal("hide");
  }

  _openPopUp: boolean = false;
  openPopUp() {
    this._openPopUp = true;
  }

  closePopUp() {
    this._openPopUp = false;
  }
  showCalander = false;
  showDialog() {
    this.showCalander = true;
  }
  getDataConstruction() {
    this.agriSrv.getDataConstruction().subscribe((data) => {
      this.conceptions = data;
      console.log(
        this.conceptions,
        this.conceptions[0].totaux_prixVente_Total,
        typeof this.conceptions[0].totaux_prixVente_Total
      );
    });
  }
  Racc;
  getData() {
    this.agriSrv.getData().subscribe((data) => {
      this.constructions = data;
      console.log(
        this.constructions,
        this.constructions[0].Tab_140.totaux_prixVente_Total_140,
        typeof this.constructions[0].Tab_140.totaux_prixVente_Total_140
      );
      this.Racc =
        parseFloat(this.conceptions[0].totaux_prixVente_Total) +
        parseFloat(this.constructions[0].Tab_140.totaux_prixVente_Total_140) +
        300000;
      console.log("Racc", this.Racc);
    });
  }

  //calcul total capex de scenario

  calcul_Mtn() {
    if (this.volume_Nm3_CH4_an <= 140 && this.volume_Nm3_CH4_an >= 0) {
      this.montant_total =
        parseFloat(this.conceptions[0].totaux_prixVente_Total) +
        parseFloat(this.constructions[0].Tab_140.totaux_prixVente_Total_140);

      return this.montant_total;
    } else if (this.volume_Nm3_CH4_an <= 190 && this.volume_Nm3_CH4_an > 141) {
      this.montant_total =
        parseFloat(this.conceptions[0].totaux_prixVente_Total) +
        parseFloat(this.constructions[1].Tab_190.totaux_prixVente_Total_190);
      return this.montant_total;
    } else if (this.volume_Nm3_CH4_an <= 240 && this.volume_Nm3_CH4_an > 191) {
      this.montant_total =
        parseFloat(this.conceptions[0].totaux_prixVente_Total) +
        parseFloat(this.constructions[2].Tab_240.totaux_prixVente_Total_240);
      return this.montant_total;
    } else if (this.volume_Nm3_CH4_an <= 280 && this.volume_Nm3_CH4_an > 241) {
      this.montant_total =
        parseFloat(this.conceptions[0].totaux_prixVente_Total) +
        parseFloat(this.constructions[3].Tab_280.totaux_prixVente_Total_280);
      return this.montant_total;
    } else if (this.volume_Nm3_CH4_an <= 560 && this.volume_Nm3_CH4_an > 281) {
      this.montant_total =
        parseFloat(this.conceptions[0].totaux_prixVente_Total) +
        parseFloat(this.constructions[4].Tab_560.totaux_prixVente_Total_560);
      return this.montant_total;
    } else if (this.volume_Nm3_CH4_an <= 760 && this.volume_Nm3_CH4_an > 561) {
      this.montant_total =
        parseFloat(this.conceptions[0].totaux_prixVente_Total) +
        parseFloat(this.constructions[5].Tab_760.totaux_prixVente_Total_760);
      return this.montant_total;
    } else if (this.volume_Nm3_CH4_an <= 960 && this.volume_Nm3_CH4_an > 761) {
      this.montant_total =
        parseFloat(this.conceptions[0].totaux_prixVente_Total) +
        parseFloat(this.constructions[6].Tab_960.totaux_prixVente_Total_960);
      return this.montant_total;
    } else if (this.volume_Nm3_CH4_an <= 1120 && this.volume_Nm3_CH4_an > 961) {
      this.montant_total =
        parseFloat(this.conceptions[0].totaux_prixVente_Total) +
        parseFloat(this.constructions[7].Tab_1120.totaux_prixVente_Total_1120);
      return this.montant_total;
    }
  }
  xxxxx;
  //Calcul aleatoire de percent fond propre et montant en euro
  @ViewChild("percent", { static: false }) per: ElementRef;

  desibled1 = false;
  desibled2 = false;
  getPercent(partPercent, partMontant) {
    this.part_financier_percent = parseFloat(partPercent);
    this.part_financier_Montant = parseFloat(partMontant);

    console.log(partPercent, partMontant);
    if (
      (partPercent == 0 && partMontant == 0) ||
      partPercent == "" ||
      partMontant == ""
    ) {
      this.part_financier_percent = 0;
      this.part_financier_Montant = 0;

      this.desibled2 = false;
      this.desibled1 = false;
    } else if ((partPercent != 0 || partMontant == "") && partMontant == 0) {
      this.desibled1 = false;
      this.part_financier_Montant = 6767;
      //  this.part_financier_percent=this.part_financier_percent
      //  this.part_financier_Montant=
      //  this.produit2(this.part_financier_percent/100,this.financement_Fp())
      // console.log("b",this.part_financier_Montant);

      this.desibled2 = true;
    } else {
      console.log("this.rep_Financement_bq", this.rep_Financement_bq);
      this.desibled1 = true;
      this.part_financier_percent = 23;
      // this.part_financier_percent=this.quotion(
      //   this.produit2(this.part_financier_Montant,100),this.rep_Financement_bq);
      //   console.log('azerty',this.part_financier_percent)
      this.desibled2 = false;
    }
    console.log("*******1", this.desibled1, "*******2", this.desibled2);
  }

  financement_bq() {
    let x = (this.rep_Financement_bq = this.produit2(0.75, this.calcul_Mtn()));
    return x;
  }
  financement_Fp() {
    let x = (this.rep_Financement_Fp =
      this.calcul_Mtn() - this.rep_Financement_bq);
    return x;
  }
  //   listenMontant(event){
  //     console.log("event",event);

  // if(this.part_financier_percent==null &&this.part_financier_Montant!=null)

  //   {

  //   console.log("this.part_financier_percent",this.part_financier_percent);

  //   return this.part_financier_percent;
  // }
  //}
  // listenPercent(E,l){
  //   console.log("event",E);

  //  let p_f_m =this.form.value

  //  console.log("p_f_m",p_f_m);

  //   if(E!=null &&this.part_financier_Montant==null)
  // console.log("hello",this.part_financier_percent,this.part_financier_Montant);

  // {
  //   this.part_financier_percent=parseFloat(this.part_financier_percent)
  //  this.part_financier_Montant=this.produit2(this.part_financier_percent/100,this.financement_Fp())
  //   console.log("b",this.part_financier_Montant);

  //   return this.part_financier_Montant;
  // }

  //   }

  //CAPEX
  public doughnutChartLabels = ["Etudes", "Gros oeuvres", "Raccordement"];
  public doughnutChartData = [120, 150, 90];
  public doughnutChartType = "doughnut";

  //Navbar Ts
  activeState = "assets/icon/gisement.png";

  states = [
    { name: "FicheClient", img: "assets/icon/ficheClient.png", tabs: "#tab11" },

    { name: "Gisement", img: "assets/icon/gisement.png", tabs: "#tab1" },

    //{ name: "Conception", img: "assets/icon/conception.png", tabs: "#tab5" },

    // {
    //   name: "Construction",
    //   img: "assets/icon/exploitation.png",
    //   tabs: "#tab6",
    // },
    // { name: "Exploitation", img: "assets/icon/capex.png", tabs: "#tab7" },

    { name: "CAPEX", img: "assets/icon/capex.png", tabs: "#tab8" },
    { name: "OPEX", img: "assets/icon/opex.png", tabs: "#tab9" },
    { name: "Recettes", img: "assets/icon/recette.png", tabs: "#tab4" },
    { name: "BPinjection", img: "assets/icon/bp.png", tabs: "#tab12" },

    { name: "Financement", img: "assets/icon/financement.png", tabs: "#tab10" },
    { name: "Scenario", img: "assets/icon/28011.png", tabs: "#tab2" },
  ];

  b(x) {
    console.log(x);
  }
  setStateAsActive(state) {
    this.activeState = state;
  }

  monthDiff() {
    let date2 = new Date().getTime();
    let date1 = new Date(this.userCreatedAt).getTime();
    if (isNaN(date1)) return "";
    //var days = Math.floor((date2 - date1) / 1000 / 60 / (60 * 24))
    var date_diff = new Date(date2 - date1);
    //console.log("ff",  days + " Days "+ date_diff.getHours() + " Hours " + date_diff.getMinutes() + " Minutes " + date_diff.getSeconds() + " Seconds");
    return date_diff.getMonth() <= 0 ? 0 : date_diff.getMonth();
  }

  prixdebase = 0;

  prixtrim = 0;
  prixpercent = 0;
  prixLineaire = 0;
  calaculPrixDeBase(val) {
    let trimestres = this.monthDiff();
    console.log("trimestres", trimestres);
    if (trimestres > 3) {
      console.log(trimestres, this.prixdebase * 0.05);
      return (this.prixtrim = this.prixdebase * 0.05);
    }

    console.log("this.percent_eff_elevage", this.percent_eff_elevage);

    if (this.percent_eff_elevage > 0.6) {
      console.log(this.percent_eff_elevage, this.prixdebase + 2);
      return (this.prixpercent = this.prixdebase + 2);
    }

    //cond trois

    let tabY = [50, 100, 150];
    let tabX = [12, 2, 10, 8, 10];

    let i, j;
    for (i = 0; i < tabY.length; i++) {
      for (j = 0; j < tabX.length; j++) {
        if (this.volume_Nm3_CH4_an <= i) {
          console.log(this.volume_Nm3_CH4_an, (this.prixLineaire = j));
          return (this.prixLineaire = j);
        } else {
          // console.log(this.volume_Nm3_CH4_an, i + this.quotion(this.produit2((val-j),((i+1)-i)), ((j+1)-j)));
          return (this.prixLineaire =
            i + this.quotion(this.produit2(val - j, i + 1 - i), j + 1 - j));
        }
      }
    }
    console.log(this.prixLineaire + this.prixpercent + this.prixtrim);
    return this.prixLineaire + this.prixpercent + this.prixtrim;
  }
  private currentStep: Steps;

  /*
   * The enum values cannot be used directly in the template. They have to declared in the Component again.
   * see: https://marco.dev/enums-angular and https://stackoverflow.com/questions/35923744/pass-enums-in-angular2-view-templates
   */
  readonly Steps = Steps;

  tab = 1;

  isActiveTab(id): boolean {
    return this.tab === id;
  }

  openTab(id): void {
    this.tab = id;
    console.log("iiiiiiiiiiiiiiiiii", id, this.tab);
  }

  setActive(nextStep: Steps): void {
    console.log("currentStep", this.currentStep);

    this.currentStep = nextStep;
  }

  isActive(step: Steps): boolean {
    return this.currentStep === step;
  }

  close() {
    this.open = false;
  }
  showProgressbar2 = false;
  showGreenColor = false;
  ha = false;
  hb = false;
  hc = false;
  hd = false;
  he = false;
  hf = false;
  hg = false;
  showNext() {
    this.showGreenColor = true;
    this.ha = true;
    this.hb = false;
    this.hc = false;
    this.hd = false;
    this.he = false;
    this.hf = false;
    this.hg = false;
  }
  greenCapex = false;
  click1() {
    this.ha = false;
    this.hb = true;
    this.hc = false;
    this.hd = false;
    this.he = false;
    this.hf = false;
    this.hg = false;

    this.greenCapex = true;
  }
  click2() {
    this.ha = false;
    this.hb = false;
    this.hc = true;
    this.hd = false;
    this.he = false;
    this.hf = false;
    this.hg = false;
    this.showProgressbar2 = true;
  }
  greenOpex = false;
  click3() {
    this.greenOpex = true;
    this.ha = false;
    this.hb = false;
    this.hc = false;
    this.hd = true;
    this.he = false;
    this.hf = false;
    this.hg = false;
  }
  greenRecette = false;
  click4() {
    this.greenRecette = true;
    this.ha = false;
    this.hb = false;
    this.hc = false;
    this.hd = false;
    this.he = true;
    this.hf = false;
    this.hg = false;
  }
  // click5(){

  //   this.ha=false
  //      this.hb=false
  //      this.hc=false
  //      this.hd=false
  //      this.he=false
  //     //  this.hf=true
  //     //  this.hg=false
  //    }
  //    click6(){

  //     this.ha=false
  //        this.hb=false
  //        this.hc=false
  //        this.hd=false
  //        this.he=false
  //       //  this.hf=false
  //       //  this.hg=true
  //      }

  clickprecedent1() {
    this.ha = false;
    this.hb = false;
    this.hc = false;
    this.hd = false;
    this.he = false;

    this.showGreenColor = false;
  }
  clickprecedent2() {
    this.ha = true;
    this.hb = false;
    this.hc = false;
    this.hd = false;
    this.he = false;

    this.greenCapex = false;
  }
  clickprecedent3() {
    this.ha = false;
    this.hb = true;
    this.hc = false;
    this.hd = false;
    this.he = false;

    this.greenCapex = false;
  }
  clickprecedent4() {
    this.ha = false;
    this.hb = false;
    this.hc = true;
    this.hd = false;
    this.he = false;

    this.greenCapex = false;
  }
  clickprecedent5() {
    this.ha = false;
    this.hb = false;
    this.hc = false;
    this.hd = true;
    this.he = false;

    this.greenRecette = false;
  }
  // clickprecedent6(){
  //   this.ha=false
  //   this.hb=false
  //   this.hc=false
  //   this.hd=false
  //   this.he=true
  //   this.hf=false
  //   this.hg=false
  //   this.greenCapex=false
  // }
  // clickprecedent7(){
  //   this.ha=false
  //   this.hb=false
  //   this.hc=false
  //   this.hd=false
  //   this.he=false
  //   this.hf=true
  //   this.hg=false
  //   this.greenCapex=false
  // }
  btnConstruction = false;
  btnRaccordement = false;
  btnInvesstissement = false;
  listBtnConception = false;
  btnConception = false;
  conceptionClick() {
    this.listBtnConception = true;
    this.btnConception = false;
  }
  closeConception() {
    this.listBtnConception = false;
  }
  constructionClick() {
    this.btnConstruction = true;
    this.btnRaccordement = false;
    this.btnInvesstissement = false;
    this.listBtnConception = false;
  }
  RaccordementClick() {
    this.btnConstruction = false;
    this.btnRaccordement = true;
    this.btnInvesstissement = false;
    this.listBtnConception = false;
  }
  AutreClick() {
    this.btnConstruction = false;
    this.btnRaccordement = false;
    this.btnInvesstissement = true;
    this.listBtnConception = false;
  }
  closeConstruction() {
    this.btnConstruction = false;
  }
  closeRaccordement() {
    this.btnRaccordement = false;
  }
  closeAutre() {
    this.btnInvesstissement = false;
  }

  listBtnexploitation = false;
  listBtnConsommable = false;
  listBtnEntretien = false;
  exploitationClick() {
    this.listBtnexploitation = true;
    this.listBtnConsommable = false;
    this.listBtnEntretien = false;
  }
  ConsommableClick() {
    this.listBtnexploitation = false;
    this.listBtnConsommable = true;
    this.listBtnEntretien = false;
  }
  EntretienClick() {
    this.listBtnexploitation = false;
    this.listBtnConsommable = false;
    this.listBtnEntretien = true;
  }
  closeExploitation() {
    this.listBtnexploitation = false;
  }
  closeConsommable() {
    this.listBtnConsommable = false;
  }
  closeEntretien() {
    this.listBtnEntretien = false;
  }

  photoTextProfile = true;
  goToProfile() {
    this.photoTextProfile = true;
    this.photoTextGisement = false;
    this.photoTextCapex = false;

    this.showGreenColor = false;
    this.greenCapex = false;
    this.clickprecedent1();
  }
  photoTextGisement = false;
  goToGisement() {
    this.photoTextGisement = true;
    this.photoTextProfile = false;
    this.photoTextCapex = false;

    this.showGreenColor = true;

    if (!this.greenCapex) this.showNext();

    this.clickprecedent2();
  }
  photoTextCapex = false;
  goToCapex() {
    this.photoTextCapex = true;
    this.photoTextGisement = false;
    this.photoTextProfile = false;

    if (this.showGreenColor) {
      this.greenCapex = true;
      this.click1();
    } else if (!this.showGreenColor) {
      this.greenCapex = false;
      this.clickprecedent1();
    }
    if (!this.greenCapex && !this.showGreenColor) {
      this.greenCapex = true;
      this.showGreenColor = true;
      this.click1();
    }
  }

  photoTextOpex = true;
  goToOpex() {
    this.photoTextOpex = true;
    this.photoTextRecette = false;
    this.photoTextScenario = false;
    this.greenOpex = false;
    this.greenRecette = false;
    this.greenScenario = false;
    this.clickprecedent4();
  }
  photoTextRecette = true;
  goToRecette() {
    this.photoTextRecette = true;
    this.photoTextOpex = false;
    this.photoTextScenario = false;

    this.greenOpex = true;
    if (!this.greenOpex) this.click3();

    this.clickprecedent5();
    //
  }

  greenScenario = false;
  photoTextScenario = true;
  goToScenario() {
    this.photoTextRecette = false;
    this.photoTextOpex = false;
    this.photoTextScenario = true;

    if (this.greenOpex) {
      this.greenRecette = true;
      this.click4();
    } else if (!this.greenOpex) {
      this.greenRecette = false;
      this.clickprecedent4();
    }
    if (!this.greenOpex && !this.greenRecette) {
      this.greenRecette = true;
      this.greenOpex = true;
      this.click4();
    }
  }

  collapse = false;
  collapseUpDown() {
    this.collapse = !this.collapse;
  }
}

enum Steps {
  STEP_1 = "step 1",
  STEP_2 = "step 2",
  STEP_3 = "step 3",
  STEP_4 = "step 4",
}
