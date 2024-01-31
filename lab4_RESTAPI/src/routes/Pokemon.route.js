"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var Pokemon_collection_1 = require("../collections/Pokemon.collection");
var Hability_collection_1 = require("../collections/Hability.collection");
var Authentication_collection_1 = require("../collections/Authentication.collection");
var router = (0, express_1.Router)();
router.use(Authentication_collection_1.default);
router.get('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var pokemons;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Pokemon_collection_1.default.find({}).lean().exec()];
            case 1:
                pokemons = _a.sent();
                res.status(200).json(pokemons);
                return [2 /*return*/];
        }
    });
}); });
// Es un servicio web que me trae a UN usuario por su id
router.get('/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, pokemon;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, Pokemon_collection_1.default.find({ id: id }).lean().exec()];
            case 1:
                pokemon = _a.sent();
                if (pokemon.length === 0) {
                    res.status(404).json({ message: "No hay pokemons con pokedex ".concat(id) });
                }
                else {
                    res.status(200).json(pokemon[0]);
                }
                return [2 /*return*/];
        }
    });
}); });
router.post('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var abilities_1, missingAbilities, pokemon, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, Hability_collection_1.default.find({ name: { $in: req.body.abilities } })];
            case 1:
                abilities_1 = _a.sent();
                if (abilities_1.length !== req.body.abilities.length) {
                    missingAbilities = req.body.abilities.filter(function (ability) { return !abilities_1.some(function (a) { return a.name === ability; }); });
                    return [2 /*return*/, res.status(400).json({ error: "No se encontraron las habilidades: ".concat(missingAbilities.join(', ')) })];
                }
                return [4 /*yield*/, Pokemon_collection_1.default.create({
                        id: req.body.id,
                        name: req.body.name,
                        description: req.body.description,
                        abilities: abilities_1.map(function (ability) { return ability._id; }),
                        type: req.body.type,
                        secondType: req.body.secondType,
                    })];
            case 2:
                pokemon = _a.sent();
                res.status(201).json(pokemon);
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                console.error('Error creando Pokemon:', error_1);
                res.status(500).json({ error: 'Internal Server Error' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// Es un servicio web que crea o actualiza un Pokemon por su id
router.put('/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, abilities_2, missingAbilities, updatedPokemon, options, pokemon, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                id = req.params.id;
                return [4 /*yield*/, Hability_collection_1.default.find({ name: { $in: req.body.abilities } })];
            case 1:
                abilities_2 = _a.sent();
                if (abilities_2.length !== req.body.abilities.length) {
                    missingAbilities = req.body.abilities.filter(function (ability) { return !abilities_2.some(function (a) { return a.name === ability; }); });
                    return [2 /*return*/, res.status(400).json({ error: "No se encontraron las habilidades: ".concat(missingAbilities.join(', ')) })];
                }
                updatedPokemon = {
                    name: req.body.name,
                    description: req.body.description,
                    abilities: abilities_2.map(function (ability) { return ability._id; }),
                    type: req.body.type,
                    secondType: req.body.secondType,
                };
                options = { upsert: true, new: true, setDefaultsOnInsert: true };
                return [4 /*yield*/, Pokemon_collection_1.default.findOneAndUpdate({ id: id }, updatedPokemon, options).lean().exec()];
            case 2:
                pokemon = _a.sent();
                res.status(200).json(pokemon);
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                console.error('Error actualizando Pokemon:', error_2);
                res.status(500).json({ error: 'Internal Server Error' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// Es un servicio para borrar un Pokemon
router.delete('/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Pokemon_collection_1.default.deleteOne({ id: req.params.id })];
            case 1:
                _a.sent();
                res.status(202).json({ message: 'El pokemon se eliminó con éxito!' });
                return [2 /*return*/];
        }
    });
}); });
exports.default = router;
